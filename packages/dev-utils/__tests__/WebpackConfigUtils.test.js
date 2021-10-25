import { resolve } from 'path';
import { buildAliasEntriesFromTsConfigPathMapping } from '../WebpackConfigUtils.js';
import { unitTest } from '../JestConfigUtils.js';

jest.mock('strip-ansi');
jest.mock('wrap-ansi');

test(unitTest('Build Webpack aliases from Typescript path mapping'), () => {
  const aliases = buildAliasEntriesFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: resolve(__dirname, './fixtures/testTsConfigPathMapping.json'),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual({
    '@something': [resolve(__dirname, './src')],
    somePath$: [
      resolve(__dirname, './src/somePath'),
      resolve(__dirname, './src/somePath1'),
    ],
  });
});

test(
  unitTest(
    'Build Webpack aliases from Typescript path mapping (with `baseUrl`)',
  ),
  () => {
    const aliases = buildAliasEntriesFromTsConfigPathMapping({
      dirname: __dirname,
      tsConfigPath: resolve(
        __dirname,
        './fixtures/testTsConfigPathMapping_withBaseUrl.json',
      ),
      excludePaths: ['toBeExcluded/*'],
    });
    expect(aliases).toEqual({
      '@something': [resolve(__dirname, '../..', './src')],
      somePath$: [
        resolve(__dirname, '../..', './src/somePath'),
        resolve(__dirname, '../..', './src/somePath1'),
      ],
    });
  },
);
