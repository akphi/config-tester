const base = require('../../scripts/jest/jest.config.base.js');

module.exports = {
  ...base,
  displayName: '@akphi/component1',
  name: '@akphi/component1',
  rootDir: '../..',
  projects: ['<rootDir>/packages/*'],
};
