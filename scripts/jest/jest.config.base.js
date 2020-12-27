/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  transform: {
    // Since `babel-jest` will not do type checking for the test code
    // we need to manually run `tsc`. Another option is to use `jest-runner-tsc`
    // which currently has certain performance limitation
    // See https://jestjs.io/docs/en/getting-started#using-typescript
    '^.+\\.[jt]sx?$': ['babel-jest'],
  },
  setupTests: ['<rootDir>/scripts/jest/setupTests.js'],
  // Setup to run immediately after the test framework has been installed in the environment
  // before each test file in the suite is executed
  // See https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
  setupFilesAfterEnv: ['jest-extended'],
  moduleNameMapper: {
    // Mock for non-javascript file as we don't need Jest to transform these
    // NOTE: we should not need this right now, but we leave this here just in case
    '\\.(svg|css)$': '<rootDir>/scripts/jest/fileMock.js',
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
  ],
  coverageDirectory: '<rootDir>/build/coverage',
  coverageReporters: ['text-summary', 'html', 'lcov'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/build/test-results',
        outputName: 'test-results.xml',
      },
    ],
  ],
  // Allow searching for file/test name while running Jest in watch mode
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
