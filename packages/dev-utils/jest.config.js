import base from '../../scripts/jest/jest.config.base.js';
import { loadJSON } from './DevUtils.js';

const packageJson = loadJSON('./package.json');

export default {
  ...base,
  displayName: packageJson.name,
  name: packageJson.name,
  rootDir: '../..',
  moduleNameMapper: {
    ...base.moduleNameMapper,
    // NOTE: since these packages use ESM exports, we will have till Jest support it, but since we don't really use
    // them in the test, we will just mock them
    // See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#im-having-problems-with-esm-and-jest
    'strip-ansi': '@akphi/dev-utils/mocks/fileMock',
    'wrap-ansi': '@akphi/dev-utils/mocks/fileMock',
  },
  testMatch: [
    '<rootDir>/packages/legend-dev-utils/**/__tests__/**/*(*.)test.[jt]s?(x)',
  ],
  // TODO: remove this when `import.meta` is supported by Jest
  // See https://github.com/facebook/jest/issues/9430
  testPathIgnorePatterns: [
    ...base.testPathIgnorePatterns,
    '<rootDir>/packages/legend-dev-utils/__tests__/WebpackConfigUtils.test.js',
  ],
};
