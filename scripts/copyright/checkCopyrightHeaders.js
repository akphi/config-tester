/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  checkCopyrightHeaders,
  updateCopyrightHeaders,
} = require('@akphi/dev-utils/CopyrightUtils');
const config = require('./copyright.config');

const toUpdate = process.argv.includes('--update');

if (toUpdate) {
  const onlyApplyToModifiedFiles = process.argv.includes('--modified');

  updateCopyrightHeaders({
    ...config,
    onlyApplyToModifiedFiles,
  });
} else {
  checkCopyrightHeaders({
    ...config,
    configFileLocation: 'scripts/copyright/copyright.config.js',
  });
}
