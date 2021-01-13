/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

module.exports = {
  transform: {
    // Since `babel-jest` will not do type checking for the test code.
    // We need to manually run `tsc`. Another option is to use `jest-runner-tsc`
    // which currently has certain performance limitation
    // See https://jestjs.io/docs/en/getting-started#using-typescript
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '../../babel.config.js') },
    ],
  },
  setupFiles: ['<rootDir>/scripts/jest/setupTests.js'],
  // Setup to run immediately after the test framework has been installed in the environment
  // before each test file in the suite is executed
  // See https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
  setupFilesAfterEnv: ['jest-extended'],
  moduleNameMapper: {
    // Mock for non-javascript file as we don't need Jest to transform these
    '\\.(svg|css|scss)$': '<rootDir>/scripts/jest/fileMock.js',
  },
  // Since each test should be independent, we automatically restore mock state before every test
  // NOTE: only works for `jest.spyOn` and not `jest.fn()`
  // See https://jestjs.io/docs/en/configuration#restoremocks-boolean
  restoreMocks: true,
  testMatch: ['**/__tests__/**/?(*.)+(test).[jt]s?(x)'],
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.[jt]s?(x)',
    '!<rootDir>/packages/*/src/**/__tests__/**/*.[jt]s?(x)',
    '!<rootDir>/packages/*/src/**/__mocks__/**/*.[jt]s?(x)',
  ],
  coverageDirectory: '<rootDir>/build/coverage',
  // Allow searching for file/test name while running Jest in watch mode
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
