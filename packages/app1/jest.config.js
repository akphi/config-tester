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
  transform: {
    // Since `babel-jest` will not do type checking for the test code
    // we need to manually run `tsc`. Another option is to use `jest-runner-tsc`
    // which currently has certain performance limitation
    // See https://jestjs.io/docs/en/getting-started#using-typescript
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  displayName: packageJson.name,
  name: packageJson.name,
  rootDir: '../..',
  testMatch: [
    `<rootDir>/packages/app1/src/**/__tests__/**/?(*.)+(test).[jt]s?(x)`,
  ],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^@akphi/app1(.*)$': '<rootDir>/src$1',
  },
};
