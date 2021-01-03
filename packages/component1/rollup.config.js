/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { generateCopyrightComment } from '@akphi/dev-utils/CopyrightUtils';
import {
  getLibraryModuleRollupConfig,
  buildAliasEntriesFromTsConfigPathMapping,
} from '@akphi/dev-utils/RollupConfigUtils';
import packageJson from './package.json';
import { getFileContent } from '@akphi/dev-utils/DevUtils';

const aliasEntries = buildAliasEntriesFromTsConfigPathMapping({
  dirname: __dirname,
  tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
  excludePaths: [],
});

const baseConfig = getLibraryModuleRollupConfig({
  input: 'src/index.tsx',
  outputDir: path.resolve(__dirname, 'lib'),
  buildDir: path.resolve(__dirname, 'build'),
  packageJsonPath: path.resolve(__dirname, 'package.json'),
  tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
  babelConfigPath: path.resolve(__dirname, '../../babel.config.js'),
  copyrightText: generateCopyrightComment({
    text: getFileContent(
      path.resolve(__dirname, '../../scripts/copyright/COPYRIGHT_HEADER.txt'),
    ),
    pkg: {
      name: packageJson.name,
      version: packageJson.version,
    },
  }),
  externalDependencies: [
    'react',
    'react-dom',
    /^@babel\/runtime/,
    /^@material-ui.*$/,
    /^monaco-editor.*$/,
  ],
  replaceEntries: [],
  aliasEntries,
});

export default baseConfig;
