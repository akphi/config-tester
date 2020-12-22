const base = require('./scripts/jest/jest.config.base.js');

module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*'],
};
