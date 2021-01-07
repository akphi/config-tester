/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { checkPublishContent } = require('@akphi/dev-utils/PublishUtils');

const argv = yargs(hideBin(process.argv)).argv;
checkPublishContent(argv.workspaceDir);
