/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

const {
  buildModuleNameMapperFromTsConfigPathMapping,
} = require('../JestConfigUtils');

test('Build Jest module mapper from Typescript path mapping', () => {
  const aliases = buildModuleNameMapperFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: path.resolve(
      __dirname,
      './fixtures/testTsConfigPathMapping.json',
    ),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual({
    '^@something\\/(.*)$': [path.resolve(__dirname, './src/$1')],
    '^somePath$': [
      path.resolve(__dirname, './src/somePath'),
      path.resolve(__dirname, './src/somePath1'),
    ],
  });
});

test('Build Jest module mapper from Typescript path mapping (with `baseUrl`)', () => {
  const aliases = buildModuleNameMapperFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: path.resolve(
      __dirname,
      './fixtures/testTsConfigPathMapping_withBaseUrl.json',
    ),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual({
    '^@something\\/(.*)$': [path.resolve(__dirname, '../..', './src/$1')],
    '^somePath$': [
      path.resolve(__dirname, '../..', './src/somePath'),
      path.resolve(__dirname, '../..', './src/somePath1'),
    ],
  });
});
