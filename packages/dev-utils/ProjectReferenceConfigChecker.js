/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const micromatch = require('micromatch');
const { execSync } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const { resolveFullTsConfig } = require('./TypescriptConfigUtils');

const getDir = (file) =>
  fs.lstatSync(file).isDirectory()
    ? file
    : file.split(path.sep).slice(0, -1).join(path.sep);

const PACKAGE_JSON_PATTERN = /package\.json$/;

const getProjectInfo = (dirname, projectPath) => {
  const projectFullPath = path.resolve(dirname, `${projectPath}`);
  const dir = getDir(projectFullPath);
  const tsConfigPath = !fs.lstatSync(projectFullPath).isDirectory()
    ? projectFullPath
    : path.resolve(projectFullPath, 'tsconfig.json');
  const tsConfig = resolveFullTsConfig(tsConfigPath);
  const packageJsonPath = path.resolve(dir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    // if `package.json` does not exists, there's nothing to check
    return undefined;
  }
  const packageJson = require(packageJsonPath);
  return { dir, tsConfig, packageJson };
};

/**
 * This script attempts to address a problem when using Typescript
 * `project reference` in a monorepo project: that is the dependency
 * has to be listed in both `package.json` and `tsconfig.json`.
 * See https://github.com/microsoft/TypeScript/issues/25376
 *
 * Note that we only check for one-direction: that is if a Typescript
 * project is listed as reference in another project, the corresponding
 * package/module must be listed as a dependency in `package.json`
 *
 * Note that this script makes the assumption that the monorepo project
 * uses project reference and organized in a particular way:
 *
 *  - the root `tsconfig.json` lists all references to all child modules
 *  - each child module contains a `tsconfig.json` that lists all of its
 *    dependent modules by the name specified in their respective
 *    `package.json`
 *  - for each child module, `package.json` and the referenced `tsconfig.*.json`
 *    are in the same directory
 *
 * See https://github.com/RyanCavanaugh/learn-a
 */
const checkProjectReferenceConfig = ({
  rootDir,
  /* micromatch glob patterns */
  excludePatterns = [],
}) => {
  const errors = [];

  try {
    // resolve all projects referenced in the root `tsconfig.json`
    // and build a lookup table between project and corresponding package
    const rootTsConfigPath = path.resolve(rootDir, './tsconfig.json');
    const rootTsConfig = resolveFullTsConfig(rootTsConfigPath);
    const projectMap = new Map();
    (rootTsConfig.references ?? [])
      .map((ref) => ref.path)
      .forEach((projectPath) => {
        try {
          const projectInfo = getProjectInfo(rootDir, projectPath);
          const { dir, packageJson, tsConfig } = projectInfo;
          if (projectInfo) {
            projectMap.set(dir, { packageJson, tsConfig });
          }
        } catch (e) {
          errors.push(e.message);
        }
      });

    // find all Typescript packages
    const tsPackages = new Set();
    const packageJsonFiles = execSync('git ls-files', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .filter(
        (file) => PACKAGE_JSON_PATTERN.test(file) && 'package.json' !== file, // omit the root `package.json`
      );
    packageJsonFiles.forEach((file) => {
      if (micromatch.isMatch(file, excludePatterns)) {
        return;
      }
      const packageJsonPath = path.resolve(rootDir, `${file}`);
      const dir = getDir(packageJsonPath);
      const packageJson = require(packageJsonPath);
      const tsConfigPath = path.resolve(dir, `tsconfig.json`);
      if (!fs.existsSync(tsConfigPath)) {
        // if `tsconfig.json` does not exists, this package is not written in Typescript, therefore we can skip it
        // NOTE: this check seems rather optimistic, the `tsconfig.json` file could be named differently
        // we might need to come up with a more sophisticated check (e.g. check `types` file in `package.json`)
        return;
      }
      // check if a package written in Typescript is not listed as a project reference in the root `tsconfig.json`
      if (!projectMap.has(dir)) {
        errors.push(
          `Project '${dir}' corresponding to package '${packageJson.name}' is not listed as a reference in root \`tsconfig.json\``,
        );
      } else {
        tsPackages.add(packageJson.name);
      }
    });

    projectMap.forEach(({ packageJson, tsConfig }, dir) => {
      const allDependencies = (packageJson.dependencies
        ? Object.keys(packageJson.dependencies)
        : []
      ).concat(
        packageJson.devDependencies
          ? Object.keys(packageJson.devDependencies)
          : [],
      );
      const dependenciesToBeReferenced = new Set(
        allDependencies.filter((dep) => tsPackages.has(dep)),
      );
      (tsConfig.references ?? [])
        .map((ref) => ref.path)
        .forEach((projectPath) => {
          try {
            const projectInfo = getProjectInfo(dir, projectPath);
            if (!projectMap.has(projectInfo.dir)) {
              // check if a Typescript project is not listed as a reference the root `tsconfig.json`
              errors.push(
                `Root \`tsconfig.json\` needs to list project '${projectInfo.dir}' corresponding to package '${projectInfo.packageJson.name}' as a reference`,
              );
            } else if (
              !allDependencies.includes(projectInfo.packageJson.name)
            ) {
              // check if a project reference is listed in `tsconfig.*.json` then its corresponding
              // package must also be listed as a dependency in `package.json`
              errors.push(
                `Package '${packageJson.name}' needs to list package '${projectInfo.packageJson.name}' as a dependency`,
              );
            } else {
              dependenciesToBeReferenced.delete(projectInfo.packageJson.name);
            }
          } catch (e) {
            errors.push(`${e.message}`);
          }
        });

      // check if a package written in Typescript that is a dependency of another package but not
      // listed as a project reference in the `tsconfig.json` file of that dependent project
      if (dependenciesToBeReferenced.size > 0) {
        dependenciesToBeReferenced.forEach((dep) => {
          errors.push(
            `Project corresponding to package '${packageJson.name}' needs to list project corresponding to package '${dep}' as a reference`,
          );
        });
      }
    });
  } catch (e) {
    errors.push(`${e.message}`);
  }

  if (errors.length > 0) {
    console.log(
      `Found ${errors.length} issue(s) with Typescript project reference configuration:`,
    );
    errors.forEach((msg) => console.log(`${chalk.red('\u2717')} ${msg}`));
    process.exit(1);
  } else {
    console.log('No issues with Typescript project reference found!');
  }
};

module.exports = {
  checkProjectReferenceConfig,
};
