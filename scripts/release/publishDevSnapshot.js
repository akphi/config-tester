/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { loadJSON } from '@finos/legend-dev-utils/DevUtils';

if (!process.env.NPM_TOKEN) {
  console.log('NPM authentication token is not specified`');
  process.exit(1);
}

const workspaceDir = process.cwd();
const packageJson = loadJSON(resolve(workspaceDir, 'package.json'));
const workspaceName = packageJson.name;
const today = new Date();
// Make sure the version signature is unique, it follows the format
// `0.0.0-dev-${commitSHA}-${YYYYMMDD}-${timestamp}`
const fullSignature = `${workspaceName}:0.0.0-dev-${
  process.env.GITHUB_SHA8
}-${today.getFullYear()}${today.getMonth()}${today.getDate()}-${today.valueOf()}`;

const publishDevSnapshot = async () => {
  const publishContentDir =
    packageJson.publishConfig?.directory ?? workspaceDir;
  console.log(`\nPublishing dev snapshot ${fullSignature}`);
  try {
    // Publish using `npm publish`
    // NOTE: the `dev` dist-tag is set so this is considered a pre-release and do not set the `latest` tag
    // See https://docs.npmjs.com/cli/v7/commands/npm-publish
    execSync(`npm publish ${publishContentDir} --tag dev`, {
      cwd: workspaceDir,
      stdio: ['pipe', 'pipe', 'inherit'], // only print error
    });
    console.log(
      chalk.green(`Successfully published dev snapshot ${fullSignature}!\n`),
    );
  } catch (publishError) {
    console.log(
      chalk.red(
        `\u2A2F Failed to publish dev snapshot ${fullSignature}. Error: ${publishError.message}`,
      ),
    );
  }
};

publishDevSnapshot();
