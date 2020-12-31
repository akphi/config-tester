/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

const isJSXSourceFile = (filename) =>
  /\.tsx$/.test(filename) && // don't care about `*.jsx` files
  !filename.includes(`${path.sep}__tests__${path.sep}`) && // exclude tests
  !filename.includes(`${path.sep}__mocks__${path.sep}`); // exclude mocks

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV); // cache based on the value of NODE_ENV. Anytime the environment changes, the config is recomputed
  const isEnvDevelopment = api.env('development');

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: false, // use `debug` option to see the lists of plugins being selected
        },
      ],
      [
        '@babel/preset-react',
        {
          development: isEnvDevelopment,
          runtime: 'automatic', // use React@17 JSX transform
        },
      ],
      function () {
        return {
          plugins: [
            // Support static, private fields. With option `loose=true`, class properties are compiled to use an
            // assignment expression instead of `Object.defineProperty`
            // See https://babeljs.io/docs/en/babel-plugin-proposal-class-properties#loose
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        };
      },
      [
        '@babel/preset-typescript',
        {
          // Allow using `declare` in class
          // NOTE: due to this flag, this plugin has to run before other class modifier plugins like `@babel/plugin-proposal-class-properties`
          onlyRemoveTypeImports: true,
          // `allowDeclareFields` will be `true` by default in babel 8
          // See https://babeljs.io/docs/en/babel-preset-typescript#allowdeclarefields
          allowDeclareFields: true,
        },
      ],
    ],
    plugins: [
      [
        // Reduce bundle size by referencing `babel` helpers from `@babel/runtime`
        // See https://babeljs.io/docs/en/babel-plugin-transform-runtime
        '@babel/plugin-transform-runtime',
        {
          version: require('@babel/runtime/package.json').version,
          // We should turn this on once the lowest version of Node LTS supports ES Modules.
          // See https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          useESModules: true,
        },
      ],
    ].filter(Boolean),
    overrides: [
      {
        test: (filename) => filename && isJSXSourceFile(filename),
        plugins: [
          // This plugin provides `react-refresh` capability, but it MUST be DISABLED for PROD
          // NOTE: as of now, this strictly works with React related files (i.e. TSX/JSX) so we have to isolate it from non-jsx files as it will cause a few issues:
          //  1. Throw error while processing indirection (i.e. web-workers or JS template - this seems to have been resolved when using webpack@5 worker support)
          //  See https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#usage-with-indirection-like-workers-and-js-templates
          //  2. When we allow this to process non-jsx files, it would throw errors like the following potentially because we force HMR on modules that HMR does not support (?):
          //  `[HMR] Error: Aborted because something.js is not accepted`
          //  See https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/24#issuecomment-672816401
          isEnvDevelopment && 'react-refresh/babel',
        ].filter(Boolean),
      },
    ],
  };

  return config;
};
