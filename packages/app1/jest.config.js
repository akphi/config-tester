/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const {
  buildModuleNameMapperFromTsConfigPathMapping,
} = require('@akphi/dev-utils/JestConfigUtils');
const base = require('../../scripts/jest/jest.config.base.js');
const packageJson = require('./package.json');

const aliases = buildModuleNameMapperFromTsConfigPathMapping({
  dirname: __dirname,
  tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
  excludePaths: [],
});

module.exports = {
  ...base,
  displayName: packageJson.name,
  name: packageJson.name,
  rootDir: '../..',
  testMatch: [
    '<rootDir>/packages/app1/src/**/__tests__/**/*(*.)test.[jt]s?(x)',
  ],
  moduleNameMapper: { ...base.moduleNameMapper, ...aliases },
};
