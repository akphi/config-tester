const github = require('@actions/github');

const postChangesetPublishCleanup = async () => {
  const publishedPackages = JSON.parse(process.env.PUBLISHED_PACKAGES);
  const tagsToCleanup = publishedPackages.map(
    (pkg) => `${pkg.name}@${pkg.version}`,
  );
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  // const mainPackage = process.env.MAIN_PACKAGE;
  await Promise.all(
    tagsToCleanup.map(async (tag) => {
      console.log(`Deleting release for tag ${tag}`);
      const release = await octokit.rest.repos.getReleaseByTag({
        tag,
        ...github.context.repo,
      });
      return octokit.rest.repos.deleteRelease({
        release_id: release.data.id,
        ...github.context.repo,
      });
    }),
  );
};

postChangesetPublishCleanup();
