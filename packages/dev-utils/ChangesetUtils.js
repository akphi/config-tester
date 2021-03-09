/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const githubChangelogFunctions = require('@changesets/changelog-github')
  .default;

console.log(githubChangelogFunctions);

const getReleaseLine = async (changeset, type, options) => {
  if (!changeset.summary) {
    return undefined; // do not show change log release line without content
  }
  return githubChangelogFunctions.getReleaseLine(changeset, type, options);
};

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine: githubChangelogFunctions.getDependencyReleaseLine,
};
