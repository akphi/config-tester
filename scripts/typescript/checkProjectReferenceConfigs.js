/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  checkProjectReferenceConfig,
} = require('@akphi/dev-utils/ProjectReferenceConfigChecker');
const path = require('path');

checkProjectReferenceConfig({
  rootDir: path.resolve(__dirname, '../../'),
  excludePatterns: [],
});
