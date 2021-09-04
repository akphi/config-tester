// const path = require('path');
const github = require('@actions/github');
// const { execSync } = require('child_process');

const postChangesetPublishCleanup = async () => {
  const publishedPackages = JSON.parse(process.env.PUBLISHED_PACKAGES);
  const releasesAndTagsToCleanup = publishedPackages.map(
    (pkg) => `${pkg.name}@${pkg.version}`,
  );
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  // const mainPackage = process.env.MAIN_PACKAGE;
  await Promise.all(
    releasesAndTagsToCleanup.map((release) => {
      console.log(`Deleting release ${release}`);
      return octokit.repos.deleteRelease({
        name: release,
      });
    }),
  );
};

postChangesetPublishCleanup();
