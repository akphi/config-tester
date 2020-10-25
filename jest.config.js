module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  restoreMocks: true,
  testMatch: [
    '**/__tests__/**/?(*.)+(test).[jt]s?(x)'
  ],
  testEnvironment: 'jsdom',
  rootDir: 'app',
  collectCoverage: false,
};
