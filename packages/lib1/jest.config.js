const base = require('../../scripts/jest/jest.config.base.js');

module.exports = {
  ...base,
  displayName: '@akphi/lib1',
  name: '@akphi/lib1',
  rootDir: '../..',
  projects: ['<rootDir>/packages/*'],
};
