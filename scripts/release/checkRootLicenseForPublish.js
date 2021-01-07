/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const workspaceDir = argv.workspaceDir;

const hasLicenseFile = fs.existsSync(path.resolve(workspaceDir, 'LICENSE'));

if (!hasLicenseFile) {
  console.log(`LICENSE file is required!`);
  process.exit(1);
}
