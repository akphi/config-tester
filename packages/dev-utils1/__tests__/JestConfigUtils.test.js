import { resolve } from 'path';
import {
  unitTest,
  buildModuleNameMapperFromTsConfigPathMapping,
} from '../JestConfigUtils.js';

test(unitTest('Build Jest module mapper from Typescript path mapping'), () => {
  const aliases = buildModuleNameMapperFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: resolve(__dirname, './fixtures/testTsConfigPathMapping.json'),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual({
    '^@something\\/(.*)$': [resolve(__dirname, './src/$1')],
    '^somePath$': [
      resolve(__dirname, './src/somePath'),
      resolve(__dirname, './src/somePath1'),
    ],
  });
});

test(
  unitTest(
    'Build Jest module mapper from Typescript path mapping (with `baseUrl`)',
  ),
  () => {
    const aliases = buildModuleNameMapperFromTsConfigPathMapping({
      dirname: __dirname,
      tsConfigPath: resolve(
        __dirname,
        './fixtures/testTsConfigPathMapping_withBaseUrl.json',
      ),
      excludePaths: ['toBeExcluded/*'],
    });
    expect(aliases).toEqual({
      '^@something\\/(.*)$': [resolve(__dirname, '../..', './src/$1')],
      '^somePath$': [
        resolve(__dirname, '../..', './src/somePath'),
        resolve(__dirname, '../..', './src/somePath1'),
      ],
    });
  },
);
