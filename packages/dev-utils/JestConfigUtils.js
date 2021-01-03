/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { resolveFullTsConfig } = require('./TypescriptConfigUtils');

const buildModuleNameMapperFromTsConfigPathMapping = ({
  dirname,
  tsConfigPath,
  excludePaths,
}) => {
  if (!dirname) {
    throw new Error(`\`dirname\` is required to build Jest module name mapper`);
  }
  const tsConfig = resolveFullTsConfig(tsConfigPath);
  const paths = tsConfig?.compilerOptions?.paths;
  const baseUrl = tsConfig?.compilerOptions?.baseUrl;
  const basePath = baseUrl ? path.resolve(dirname, baseUrl) : dirname;
  if (paths) {
    const aliases = {};
    Object.entries(paths).forEach(([key, value]) => {
      if (excludePaths.includes(key)) {
        return;
      }
      const regexp = `^${key.replace('*', '(.*)').replace('/', '\\/')}$`;
      const replacement = (Array.isArray(value) ? value : [value]).map((val) =>
        val.replace('*', '$1'),
      );
      aliases[regexp] = replacement.map((val) => path.resolve(basePath, val));
    });
    return aliases;
  }
  return {};
};

module.exports = {
  buildModuleNameMapperFromTsConfigPathMapping,
};
