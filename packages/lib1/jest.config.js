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
  moduleNameMapper: {
    ...base.moduleNameMapper,
    'lodash-es': 'lodash',
  },
  testMatch: [
    '<rootDir>/packages/lib1/src/**/__tests__/**/*(*.)test.[jt]s?(x)',
  ],
};
