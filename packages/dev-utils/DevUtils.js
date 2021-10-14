/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');

const getFileContent = (file) => fs.readFileSync(file, { encoding: 'utf-8' });
const createRegExp = (pattern) => new RegExp(pattern);

const { cosmiconfigSync } = require('cosmiconfig');

const getConfigLoader = (configName) =>
  cosmiconfigSync(configName, {
    searchPlaces: [
      'package.json',
      `.${configName}rc`,
      `.${configName}rc.json`,
      `.${configName}rc.js`,
      `${configName}.config.js`,
    ],
  });

const loadJSON = (path) => JSON.parse(getFileContent(path));

module.exports = {
  getConfigLoader,
  getFileContent,
  createRegExp,
  loadJSON,
};
