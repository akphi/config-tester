/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const base = require('../../scripts/jest/jest.config.base.js');
const packageJson = require('./package.json');

module.exports = {
  ...base,
  displayName: packageJson.name,
  name: packageJson.name,
  rootDir: '../..',
  testMatch: [
    `<rootDir>/packages/app1/src/**/__tests__/**/?(*.)+(test).[jt]s?(x)`,
  ],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^@akphi/app1(.*)$': '<rootDir>/packages/app1/src$1',
  },
};
