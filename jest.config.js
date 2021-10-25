import base from './scripts/jest/jest.config.base.js';

export default {
  ...base,
  projects: ['<rootDir>/packages/*'],
};
