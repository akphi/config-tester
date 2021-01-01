/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');
const visualizer = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const json = require('@rollup/plugin-json');
const eslint = require('@rollup/plugin-eslint');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');

const getLibraryModuleRollupConfig = ({
  input,
  outputDir,
  buildDir,
  packageJsonPath,
  tsConfigPath,
  babelConfigPath,
  copyrightText,
  externalDependencies,
  /**
   * Entries for `@rollup/plugin-replace`
   */
  replaceEntries,
  /**
   * TODO: entries for plugin aliases
   */
  alias,
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
    external: externalDependencies,
    plugins: [
      /**
       * `@rollup/plugin-eslint` has to be placed before `@rollup/plugin-babel`
       * to lint source code (pre transpile)
       * TODO: test include/ignore scope
       */
      isEnvDevelopment &&
        !isEnvDevelopment_Fast &&
        eslint({
          include: 'src/**/*.{ts,tsx}',
          // ignore test files for faster check
          ignorePattern: [
            'src/**/__tests__/*.ts',
            'src/**/__tests__/*.tsx',
            'src/**/__mocks__/*.ts',
            'src/**/__mocks__/*.tsx',
          ],
          parserOptions: {
            project: tsConfigPath,
          },
        }),
      /**
       * `@rollup/plugin-node-resolve` locates modules using the Node resolution algorithm,
       * for when third party modules in `node_modules` are referred to in the code
       */
      nodeResolve(),
      json(),
      babel({
        // Avoid bundling `babel` helpers
        // See https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
        babelHelpers: 'runtime',
        exclude: /node_modules/,
        configFile: babelConfigPath,
        extensions: ['.tsx', '.ts', '.mjs', '.js'],
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

module.exports = {
  getLibraryModuleRollupConfig,
};
