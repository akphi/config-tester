/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { resolveFullTsConfig } = require('../TypescriptConfigUtils');

test('Full Typescript config resolved properly through inheritance chain', () => {
  expect(
    resolveFullTsConfig(path.resolve(__dirname, './testTsConfig.json')),
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
    include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.json'],
    // references are not inherited
  });
});
