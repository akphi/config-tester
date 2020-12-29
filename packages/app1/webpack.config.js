/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const appConfig = require('./app.config');
const {
  getWebAppBaseWebpackConfig: getAppBaseWebpackConfig,
} = require('@akphi/dev-utils/WebpackConfigUtils');

module.exports = (env, arg) => {
  const baseConfig = getAppBaseWebpackConfig(env, arg, __dirname, {
    mainEntryPath: './src/index.tsx',
    indexHtmlPath: './src/index.html',
    appConfig,
  });
  const config = {
    ...baseConfig,
    // resolve: {
    //   ...baseConfig.resolve,
    //   alias: {
    //     ...baseConfig.resolve.alias,
    //     '@akphi/app1': path.resolve(__dirname, 'src'),
    //   },
    // },
    plugins: [
      ...baseConfig.plugins,
      // new MonacoWebpackPlugin({
      //   // Only include what we need to lessen the bundle loads
      //   // See https://github.com/microsoft/monaco-editor-webpack-plugin
      //   languages: ['json', 'java', 'markdown'],
      //   // Here we can choose to also exclude/include features but this really does not
      //   // significantly affect the bundle size.
      //   // See https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97
      //   // See https://github.com/microsoft/monaco-editor-webpack-plugin/issues/40
      //   features: [
      //     'bracketMatching',
      //     'clipboard',
      //     'contextmenu',
      //     'coreCommands',
      //     'comment',
      //     'find',
      //     'folding',
      //     'gotoLine',
      //     'hover',
      //     'multicursor',
      //   ],
      // }),
    ],
  };
  return config;
};
