import { resolve } from 'path';
import {
  getTsConfigJSON,
  resolveFullTsConfig,
  resolveFullTsConfigWithoutValidation,
} from '../TypescriptConfigUtils.js';
import { unitTest } from '../JestConfigUtils.js';

test(
  unitTest('Resolve full Typescript config through inheritance chain'),
  () => {
    expect(
      resolveFullTsConfig(
        resolve(__dirname, './fixtures/testTsConfigExtend.json'),
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
  },
);

test(
  unitTest(
    'Resolve full Typescript config without validation through inheritance chain',
  ),
  () => {
    expect(
      // This invalid config doesn't have `files` nor `include`
      // would fail `tsc --showConfig`
      resolveFullTsConfigWithoutValidation(
        resolve(__dirname, './fixtures/testTsConfigExtend_invalid.json'),
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
  },
);

test(unitTest('Parse Typescript config non-recursively'), () => {
  expect(
    getTsConfigJSON(
      resolve(__dirname, './fixtures/testTsConfigWithTrailingCommas.json'),
    ),
  ).toEqual({
    compilerOptions: {
      paths: {
        '@something/*': './src/*',
        somePath: ['./src/somePath', './src/somePath1'],
        'toBeExcluded/*': 'nothing',
      },
    },
    include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.json'],
  });
  expect(() =>
    getTsConfigJSON(
      resolve(__dirname, './fixtures/testTsConfigWithTrailingCommas.json'),
      true,
    ),
  ).toThrow();
});
