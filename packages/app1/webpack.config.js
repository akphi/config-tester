/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const appConfig = require('./app.config');
const {
  getWebAppBaseWebpackConfig,
} = require('@akphi/dev-utils/WebpackConfigUtils');

module.exports = (env, arg) => {
  const baseConfig = getWebAppBaseWebpackConfig(env, arg, __dirname, {
    mainEntryPath: './src/index.tsx',
    indexHtmlPath: './src/index.html',
    babelConfigPath: path.resolve(__dirname, '../../babel.config.js'),
    appConfig,
  });
  const config = {
    ...baseConfig,
    resolve: {
      ...baseConfig.resolve,
      alias: {
        ...baseConfig.resolve.alias,
      },
    },
    plugins: [...baseConfig.plugins],
  };
  return config;
};
