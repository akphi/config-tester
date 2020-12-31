/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import packageJson from './package.json';

// prettier-ignore
const banner =
`/**
  * @license config-tester v${packageJson.version}
  * Copyright (c) An Phi.
  * Released under the MIT License.
  */`;

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvProduction_Analyze = process.env.BUILD_MODE === 'analyze';
const isEnvDevelopment_Advanced = process.env.DEVELOPMENT_MODE === 'advanced';
const isEnvDevelopment_Fast = process.env.DEVELOPMENT_MODE === 'fast';

const config = {
  input: 'src/index.tsx',
  external: [
    'react',
    'react-dom',
    /^@babel\/runtime/,
    /^@material-ui.*$/,
    /^monaco-editor.*$/,
  ],
  output: [
    {
      // NOTE: we export CommonJS bundle only for testing since `Jest` support for
      // ESM is currently quite limitted
      // See https://github.com/facebook/jest/issues/9430
      file: packageJson.main,
      format: 'cjs',
      sourcemap: !isEnvDevelopment,
      banner,
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: !isEnvDevelopment,
      banner,
    },
  ],
  plugins: [
    /**
     * `@rollup/plugin-eslint` has to be placed before `@rollup/plugin-babel`
     * to lint untranspiled code
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
          project: path.resolve(__dirname, './tsconfig.json'),
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
      configFile: path.resolve(__dirname, '../../babel.config.js'),
      extensions: ['.tsx', '.ts', '.mjs', '.js'],
      sourceMaps: !isEnvDevelopment,
      inputSourceMap: !isEnvDevelopment,
    }),
    postcss({
      extract: path.resolve(__dirname, './lib/index.css'),
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
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    /**
     * `rollup-plugin-visualizer` creates analysis on bundle size
     * See https://github.com/btd/rollup-plugin-visualizer
     */
    isEnvProduction_Analyze &&
      visualizer({
        filename: 'build/bundle-analysis.html',
        open: true,
      }),
    isEnvProduction && terser(),
  ].filter(Boolean),
};

export default config;
