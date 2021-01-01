/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs');
const { parse } = require('jsonc-parser');
const { getFileContent } = require('./DevUtils');

const getDir = (file) =>
  fs.lstatSync(file).isDirectory()
    ? file
    : file.split(path.sep).slice(0, -1).join(path.sep);

const getTsConfigJSON = (file) => {
  const parseErrors = [];
  if (!fs.existsSync(file)) {
    throw new Error(`Can't find Typescript config file with path '${file}'`);
  }
  const text = getFileContent(file);
  const json = parse(text, parseErrors);
  if (parseErrors.length > 0) {
    throw new Error(`Can't parse Typescript config file with path '${file}'`);
  }
  return json;
};

const resolveFullTsConfig = (fullTsConfigPath) => {
  let tsConfig = getTsConfigJSON(fullTsConfigPath);
  let tsConfigDir = getDir(fullTsConfigPath);
  let ext = tsConfig.extends;
  while (ext) {
    const parentTsConfigPath = path.resolve(tsConfigDir, ext);
    tsConfigDir = getDir(parentTsConfigPath);
    let parentTsConfig;
    try {
      parentTsConfig = getTsConfigJSON(parentTsConfigPath);
    } catch {
      throw new Error(
        `Can't resolve parent Typescript config file with relative path '${ext}' for config file with path '${fullTsConfigPath}'`,
      );
    }
    tsConfig = { ...parentTsConfig, ...tsConfig };
    ext = parentTsConfig.extends;
  }
  return tsConfig;
};

module.exports = {
  resolveFullTsConfig,
};
