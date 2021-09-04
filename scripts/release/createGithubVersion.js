const github = require('@actions/github');
const { execSync } = require('child_process');

const postChangesetPublishCleanup = async () => {
  const publishedPackages = JSON.parse(process.env.PUBLISHED_PACKAGES);
  const tagsToCleanup = publishedPackages.map(
    (pkg) => `${pkg.name}@${pkg.version}`,
  );
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  const mainPackageName = process.env.MAIN_PACKAGE;
  const releaseVersion = publishedPackages.find(
    (pkg) => pkg.name === mainPackageName,
  )?.version;

  console.log(
    `Removing Github releases and tags created by changesets/action...`,
  );
  const tagsNotRemoved = [];
  await Promise.all(
    tagsToCleanup.map(async (tag) => {
      try {
        // Delete the release published on Github by `changesets/action`
        // Check the following links for Github actions API reference
        // See https://octokit.github.io/rest.js/v18/
        // See https://docs.github.com/en/rest/reference/repos#releases
        const release = await octokit.rest.repos.getReleaseByTag({
          tag,
          ...github.context.repo,
        });
        await octokit.rest.repos.deleteRelease({
          release_id: release.data.id,
          ...github.context.repo,
        });
        // Delete the tags published by `changesets/action`
        execSync(`git push --delete origin ${tag}`, {
          cwd: process.cwd(),
          stdio: ['pipe', 'pipe', 'inherit'], // only print error
        });
        console.log(`\u2713 Removed release and tag ${tag}`);
      } catch (error) {
        tagsNotRemoved.push(tag);
        console.log(
          `\u2A2F Can't remove release and tag ${tag}. Error:\n${error.message}`,
        );
      }
    }),
  );

  if (tagsNotRemoved.length) {
    console.warn(
      `The following tags and their respective releases are not removed from Github. Please manually remove them on Github:\n${tagsNotRemoved
        .map((tag) => `- ${tag}`)
        .join('\n')}`,
    );
  }

  if (releaseVersion) {
    try {
      await octokit.rest.repos.createRelease({
        tag_name: `v${releaseVersion}`,
        name: `Version ${releaseVersion}`,
        body: `👋  _We are crafting a release note for this version..._\n> Meanwhile, please refer to the latest \`New Release\` pull request for a summary of code changes.`,
        ...github.context.repo,
      });
      console.log(
        `\u2713 Successfully created release for tag v${releaseVersion}. Please add release note for this on Github.`,
      );
    } catch (error) {
      console.log(
        `\u2713 Failed to create release with tag v${releaseVersion}. Please manually create this release tag on Github.`,
      );
    }
  }
};

postChangesetPublishCleanup();
