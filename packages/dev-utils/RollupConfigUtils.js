/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const chalk = require('chalk');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');
const visualizer = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const json = require('@rollup/plugin-json');
const eslint = require('@rollup/plugin-eslint');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');
const { resolveFullTsConfig } = require('./TypescriptConfigUtils');

const extensions = ['.tsx', '.ts', '.mjs', '.js'];

const resolver = nodeResolve({
  extensions,
});

const getLibraryModuleRollupConfig = ({
  input,
  outputDir,
  buildDir,
  packageJsonPath,
  tsConfigPath,
  babelConfigPath,
  copyrightText,
  /**
   * Dependencies matching these patterns will not be included
   * in the bundle.
   */
  externalDependencies,
  /**
   * Entries for `@rollup/plugin-replace`
   * See https://github.com/rollup/plugins/tree/master/packages/replace#usage
   */
  replaceEntries,
  /**
   * Entries for `@rollup/plugin-alias`
   * See https://github.com/rollup/plugins/tree/master/packages/alias#usage
   */
  aliasEntries,
}) => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';
  const isEnvProduction_Analyze = process.env.BUILD_MODE === 'analyze';
  const isEnvDevelopment_Fast = process.env.DEVELOPMENT_MODE === 'fast';
  const packageJson = require(packageJsonPath);

  const config = {
    input,
    output: [
      {
        // NOTE: we export CommonJS bundle only for testing since `Jest` support for
        // ESM is currently quite limited
        // See https://github.com/facebook/jest/issues/9430
        file: packageJson.main,
        format: 'cjs',
        sourcemap: !isEnvDevelopment,
        banner: copyrightText,
      },
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: !isEnvDevelopment,
        banner: copyrightText,
      },
    ],
    watch: {
      clearScreen: false,
    },
    external: externalDependencies,
    plugins: [
      /**
       * `@rollup/plugin-eslint` has to be placed before `@rollup/plugin-babel`
       * to lint source code (pre transpile)
       *
       * Just like `webpack` test files are not included from the entry point
       * so they will scanned during compilation, hence no need to ignore them.
       *
       * Also, note that `rollup --watch` is incremental, so new only changed
       * files are passed through `eslint` plugin again, this means that
       * warnings/errors for unchanged files will not show up in the dev console
       * even though they still remain after the change.
       */
      isEnvDevelopment &&
        !isEnvDevelopment_Fast &&
        eslint({
          include: 'src/**/*.{ts,tsx}',
          parserOptions: {
            project: tsConfigPath,
          },
        }),
      /**
       * `@rollup/plugin-alias` allows defining aliases when bundling packages.
       * This has a few limitations though:
       * 1. It does not support array of values for replacement like other tools (Typescript, Webpack, Babel, Jest)
       *    See https://github.com/rollup/plugins/issues/754
       *    If this is needed, we might need to use `babel-plugin-module-resolver`.
       * 2. It requires a custom resolver to handle extensions
       */
      alias({
        entries: aliasEntries,
        // We need custom resolver so we can omit the extensions
        // but to use this each replacement we provide need to be absolute path
        // See https://www.npmjs.com/package/@rollup/plugin-alias#custom-resolvers
        customResolver: resolver,
      }),
      /**
       * `@rollup/plugin-node-resolve` locates modules using the Node resolution algorithm,
       * for when third party modules in `node_modules` are referred to in the code
       */
      resolver,
      json(),
      babel({
        // Avoid bundling `babel` helpers
        // See https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
        babelHelpers: 'runtime',
        exclude: /node_modules/,
        configFile: babelConfigPath,
        extensions,
        sourceMaps: !isEnvDevelopment,
        inputSourceMap: !isEnvDevelopment,
      }),
      postcss({
        extract: path.resolve(outputDir, 'index.css'),
        plugins: [
          !isEnvDevelopment && require('autoprefixer'), // adding vendor prefixes
          !isEnvDevelopment && require('cssnano'), // minification
        ].filter(Boolean),
        sourceMap: !isEnvDevelopment,
      }),
      /**
       * `@rollup/plugin-commonjs` converts CommonJS modules/dependencies to ES6,
       * so they can be included in a Rollup bundle.
       */
      commonjs({
        // Make sure this only apply to code in `node_modules` instead of code in our codebase which is symlinked by `yarn-workspace`
        include: /node_modules/, // See https://github.com/rollup/plugins/tree/master/packages/commonjs#usage-with-symlinks
        sourceMap: !isEnvDevelopment,
      }),
      /**
       * `@rollup/plugin-replace` replaces strings in files while bundling.
       * We use this to replace places in the code where we use
       * `process.env.NODE_ENV` for code logic
       */
      replace({
        ...replaceEntries,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      /**
       * `rollup-plugin-visualizer` creates analysis on bundle size
       * See https://github.com/btd/rollup-plugin-visualizer
       */
      isEnvProduction_Analyze &&
        visualizer({
          filename: path.resolve(buildDir, '/bundle-analysis.html'),
          open: true,
        }),
      isEnvProduction && terser(),
    ].filter(Boolean),
  };

  return config;
};

/**
 * See the note on `@rollup/plugin-alias` limitations.
 * It does not support array of paths like Typescript.
 *
 * If this is the case, we need to add the paths to `excludedPaths`
 * and handle this separately using some plugins like
 * `babel-plugin-module-resolver`. However, this is a _very_ rare case though.
 */
const buildAliasEntriesFromTsConfigPathMapping = ({
  dirname,
  tsConfigPath,
  excludePaths,
}) => {
  if (!dirname) {
    throw new Error(`\`dirname\` is required to build Rollup alias entries`);
  }
  let hasArrayValuePath = false;
  const tsConfig = resolveFullTsConfig(tsConfigPath);
  const paths = tsConfig?.compilerOptions?.paths;
  const baseUrl = tsConfig?.compilerOptions?.baseUrl;
  const basePath = baseUrl ? path.resolve(dirname, baseUrl) : dirname;
  if (paths) {
    const aliases = [];
    Object.entries(paths).forEach(([key, value]) => {
      if (excludePaths.includes(key)) {
        return;
      }
      const regexp = `^${key.replace('*', '(.*)').replace('/', '\\/')}$`;
      let replacement;
      if (Array.isArray(value)) {
        if (value.length > 1) {
          hasArrayValuePath = true;
        }
        // default to use the first element of the array when multiple mappings are found
        replacement = value.length === 0 ? undefined : value[0];
      } else {
        replacement = value;
      }
      if (replacement) {
        replacement = replacement.replace('*', '$1');
        aliases.push({
          find: new RegExp(regexp),
          replacement: path.resolve(basePath, replacement),
        });
      }
    });
    if (hasArrayValuePath) {
      console.log(
        chalk.yellow(
          '[!] Typescript path-mapping contains array value which is not supported by `@rollup/plugin-alias`, by default the first value of the array is used.\n' +
            'Consider using other alternative, such as `babel-plugin-module-resolver`',
        ),
      );
    }
    return aliases;
  }
  return [];
};

module.exports = {
  getLibraryModuleRollupConfig,
  buildAliasEntriesFromTsConfigPathMapping,
};
