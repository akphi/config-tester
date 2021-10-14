/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');
const { resolve } = require('path');
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { loadJSON } = require('@akphi/dev-utils/DevUtils');

const workspaceDir = process.cwd();
const packageJson = loadJSON(resolve(workspaceDir, 'package.json'));
const workspaceName = packageJson.name;
const today = new Date();
// Make sure the version signature is unique, it follows the format
// `0.0.0-dev-${commitSHA8}-${YYYYMMDD}-${timestamp}`
const fullVersionSignature = `0.0.0-dev-${process.env.GITHUB_SHA.substring(
  0,
  8,
)}-${today.getFullYear()}${today
  .getMonth()
  .toString()
  .padStart(2, '0')}${today
  .getDate()
  .toString()
  .padStart(2, '0')}-${today.valueOf()}`;
const fullSignature = `${workspaceName}:${fullVersionSignature}`;

const publishDevSnapshot = async () => {
  const publishContentDir = packageJson.publishConfig?.directory
    ? resolve(workspaceDir, packageJson.publishConfig.directory)
    : workspaceDir;
  console.log(`\nPublishing dev snapshot ${fullSignature}`);
  try {
    // Update `package.json` file
    packageJson.version = fullVersionSignature;
    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(
      (depType) => {
        if (packageJson[depType]) {
          Object.keys(packageJson[depType] ?? {}).forEach((key) => {
            if (packageJson[depType][key] === 'workspace:*') {
              packageJson[depType][key] = fullVersionSignature;
            }
          });
        }
      },
    );

    writeFileSync(
      resolve(publishContentDir, 'package.json'),
      JSON.stringify(packageJson, undefined, 2),
    );
    console.log(
      chalk.green(
        `\u2713 Fully resolved dependencies versions in 'package.json'`,
      ),
    );
    // Publish using `npm publish`
    // NOTE: the `dev` dist-tag is set so this is considered a pre-release and do not set the `latest` tag
    // See https://docs.npmjs.com/cli/v7/commands/npm-publish
    execSync(`npm publish ${publishContentDir} --tag dev --access public`, {
      cwd: workspaceDir,
      stdio: ['pipe', 'pipe', 'inherit'], // only print error
    });
    console.log(
      chalk.green(`Successfully published dev snapshot ${fullSignature}\n`),
    );
  } catch (publishError) {
    console.log(
      chalk.red(
        `\u2A2F Failed to publish dev snapshot ${fullSignature}. Error: ${publishError.message}`,
      ),
    );
  }
};

publishDevSnapshot();
