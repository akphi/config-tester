/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { getConfigLoader } = require('@akphi/dev-utils/DevUtils');

const configLoader = getConfigLoader('_package');

const resolveConfig = (filePath) => {
  const result = configLoader.search(filePath);
  return result?.config;
};

module.exports = {
  resolveConfig,
  configLoader,
};
