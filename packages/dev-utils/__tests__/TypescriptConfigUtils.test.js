/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const {
  resolveFullTsConfig,
  resolveFullTsConfigWithoutValidation,
} = require('../TypescriptConfigUtils');

test('Resolve full Typescript config through inheritance chain', () => {
  expect(
    resolveFullTsConfig(
      path.resolve(__dirname, './fixtures/testTsConfigExtend.json'),
    ),
  ).toEqual({
    // compiler options is merged and overwritten
    compilerOptions: {
      emitDeclarationOnly: true,
      jsx: 'react-jsx',
      outDir: './lib',
      paths: { somePath: 'somePath' },
      rootDir: './src',
      strictNullChecks: true,
    },
    // `files`, `exclude`, `include` are simply overwritten
    files: ['./src/dummy.ts'], // files are automatically added by `tsc`
    exclude: ['excludeParent'],
    include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.json'],
    // references are not inherited
  });
});

test('Resolve full Typescript config without validation through inheritance chain', () => {
  expect(
    // This invalid config doesn't have `files` nor `include`
    // would fail `tsc --showConfig`
    resolveFullTsConfigWithoutValidation(
      path.resolve(__dirname, './fixtures/testTsConfigExtend_invalid.json'),
    ),
  ).toEqual({
    // compiler options is merged and overwritten
    compilerOptions: {
      emitDeclarationOnly: true,
      jsx: 'react-jsx',
      outDir: 'lib',
      paths: { somePath: 'somePath' },
      rootDir: 'src',
      strictNullChecks: true,
    },
    // extends is removed as we have fully resolved the config
    extends: undefined,
    // `files`, `exclude`, `include` are simply overwritten
    exclude: ['excludeParent'],
    // references are not inherited
  });
});
