/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

const {
  buildAliasEntriesFromTsConfigPathMapping,
} = require('../RollupConfigUtils');

test('Build Rollup alias entries from Typescript path mapping', () => {
  const aliases = buildAliasEntriesFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: path.resolve(
      __dirname,
      './fixtures/testTsConfigPathMapping_noArrayValues.json',
    ),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual([
    {
      find: new RegExp('^@something\\/(.*)$'), // eslint-disable-line prefer-named-capture-group
      replacement: path.resolve(__dirname, './src/$1'),
    },
    {
      find: new RegExp('^somePath$'),
      replacement: path.resolve(__dirname, './src/somePath'),
    },
  ]);
});

test('Build Rollup alias entries from Typescript path mapping (with array value)', () => {
  const mockedConsole = jest.spyOn(console, 'log').mockImplementation();
  const aliases = buildAliasEntriesFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: path.resolve(
      __dirname,
      './fixtures/testTsConfigPathMapping.json',
    ),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual([
    {
      find: new RegExp('^@something\\/(.*)$'), // eslint-disable-line prefer-named-capture-group
      replacement: path.resolve(__dirname, './src/$1'),
    },
    {
      find: new RegExp('^somePath$'),
      replacement: path.resolve(__dirname, './src/somePath'),
    },
  ]);
  expect(mockedConsole).toHaveBeenCalledTimes(1);
  expect(mockedConsole.mock.calls[0][0]).toContain(
    'Typescript path-mapping contains array value which is not supported by',
  );
});

test('Build Rollup alias entries from Typescript path mapping (with `baseUrl`)', () => {
  const mockedConsole = jest.spyOn(console, 'log').mockImplementation();
  const aliases = buildAliasEntriesFromTsConfigPathMapping({
    dirname: __dirname,
    tsConfigPath: path.resolve(
      __dirname,
      './fixtures/testTsConfigPathMapping_withBaseUrl.json',
    ),
    excludePaths: ['toBeExcluded/*'],
  });
  expect(aliases).toEqual([
    {
      find: new RegExp('^@something\\/(.*)$'), // eslint-disable-line prefer-named-capture-group
      replacement: path.resolve(__dirname, '../..', './src/$1'),
    },
    {
      find: new RegExp('^somePath$'),
      replacement: path.resolve(__dirname, '../..', './src/somePath'),
    },
  ]);
  expect(mockedConsole).toHaveBeenCalledTimes(1);
  expect(mockedConsole.mock.calls[0][0]).toContain(
    'Typescript path-mapping contains array value which is not supported by',
  );
});
