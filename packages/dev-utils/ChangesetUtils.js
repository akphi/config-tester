/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const githubChangelogFunctions = require('@changesets/changelog-github')
  .default;

console.log(githubChangelogFunctions);

module.exports = {
  getReleaseLine: githubChangelogFunctions.getReleaseLine,
  getDependencyReleaseLine: githubChangelogFunctions.getDependencyReleaseLine,
};
