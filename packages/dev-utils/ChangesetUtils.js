const githubChangelogFunctions = require('@changesets/changelog-github')
  .default;

console.log(githubChangelogFunctions);

module.exports = {
  getReleaseLine: githubChangelogFunctions.getReleaseLine,
  getDependencyReleaseLine: githubChangelogFunctions.getDependencyReleaseLine,
};
