const github = require('@actions/github');
const { execSync } = require('child_process');

/**
 * Create a github action
 * take inputs:
 * 1. Current milestone release version (e.g. 0.8.0)
 * 2. Version bump type `major` or `minor` this will be passed into the `release:bump` script
 * We can compute the next release then using `semver.inc("1.6.0", "patch")`
 * *** only run on default branch ***
 * 1. Create release branch then push
 *    - git checkout -b
 * 2. Prepare for next development iteration
 *    - Run `yarn release:bump`
 *    - git add . && git commit -m "prepare for the next development iteration"
 *    - git push
 */

const prepareNewRelease = async () => {
  // create release branch
  // - https://docs.github.com/en/rest/reference/git#get-a-reference
  // - https://docs.github.com/en/rest/reference/git#create-a-reference

  // - [ ] Input old version (minor version) only as input and new version as output (e.g. old = 0.6.0, new = 0.7.0). Use metadata syntax
  // - [ ] This action is manually triggered, and it follows the standard release workflow
  // - [ ] From the old version tag, create a new release branch git checkout -b release/{new version} {old version}
  // - [ ] Create a script to automatically move all opened issues in the old version's milestones and move them over to the new milestone. Then close out the old milestone
  // - [ ] Run the script yarn release:bump and commit those changes to master with commit name prepare for the next version release

  // get all open milestone
  // get the milestone to close by name
  // create the new milestone
  // move all open issues under old milestone to new milestone - /repos/{owner}/{repo}/issues
  //   keep calling with pagination to assemble the full list
  //   update  Update an issue
  // close the old milestone
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

// prepareNewRelease();
console.log('carl');
