/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  extensions: ['js', 'ts', 'tsx', 'css', 'scss'],
  /**
   * Regexp patterns for excluded paths
   */
  excludePatterns: [],
  copyrightText: fs.readFileSync(
    path.resolve(__dirname, './COPYRIGHT_HEADER.txt'),
    {
      encoding: 'utf-8',
    },
  ),
};
