/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  getLibraryModuleBaseWebpackConfig: getModuleBaseWebpackConfig,
} = require('@akphi/dev-utils/WebpackConfigUtils');

module.exports = (env, arg) => {
  const baseConfig = getModuleBaseWebpackConfig(env, arg, __dirname, {
    mainEntryPath: './src/index.tsx',
  });
  const config = {
    ...baseConfig,
    // LIB-ONLY
    externals: ['react', 'react-dom', /^@material-ui.*$/, /^monaco-editor.*$/],
  };
  return config;
};
