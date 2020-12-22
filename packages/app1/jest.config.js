const base = require('../../scripts/jest/jest.config.base.js');

module.exports = {
  ...base,
  displayName: '@akphi/app1',
  name: '@akphi/app1',
  rootDir: '../..',
  projects: ['<rootDir>/packages/*'],
};
