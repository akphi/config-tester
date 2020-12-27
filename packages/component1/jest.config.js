/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const base = require('../../scripts/jest/jest.config.base.js');

module.exports = {
  ...base,
  displayName: '@akphi/component1',
  name: '@akphi/component1',
  rootDir: '../..',
  projects: ['<rootDir>/packages/*'],
};
