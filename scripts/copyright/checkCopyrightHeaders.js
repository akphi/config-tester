/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { checkCopyrightHeaders } = require('@akphi/dev-utils/CopyrightUtils');
const config = require('./copyright.config');

checkCopyrightHeaders({
  ...config,
  configFileLocation: 'scripts/copyright/copyright.config.js',
});
