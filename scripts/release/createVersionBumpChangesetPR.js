import * as github from '@actions/github';
import * as githubActionCore from '@actions/core';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import {
  STANDARD_RELEASE_VERSION_BUMP_CHANGESET_PATH,
  STANDARD_RELEASE_VERSION_BUMP_CHANGESET_SHORT_PATH,
  ITERATION_RELEASE_VERSION_BUMP_CHANGESET_PATH,
  ITERATION_RELEASE_VERSION_BUMP_CHANGESET_SHORT_PATH,
} from './releaseVersionUtils.js';

const DEFAULT_BRANCH_NAME = 'master';
const CHANGESET_PR_BRANCH_NAME = 'bot/prepare-release';

const prepareNewStandardRelease = async () => {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  const bumpType = process.env.BUMP_TYPE;

  // Push release version bump changeset
  console.log(`Creating release version bump changeset PR...`);
  const isChangesetNew = Boolean(
    execSync('git status --porcelain', { encoding: 'utf-8' }),
  );

  if (!isChangesetNew) {
    githubActionCore.warning(
      `(skipped) Next release version bump changeset already existed`,
    );
  } else {
    try {
      const changesetContent = Buffer.from(
        readFileSync(
          bumpType === 'major'
            ? STANDARD_RELEASE_VERSION_BUMP_CHANGESET_PATH
            : ITERATION_RELEASE_VERSION_BUMP_CHANGESET_PATH,
          'utf-8',
        ),
      ).toString('base64');
      const defaultBranchRef = (
        await octokit.rest.git.getRef({
          ref: `heads/${DEFAULT_BRANCH_NAME}`,
          ...github.context.repo,
        })
      ).data;
      // clean the PR branch just in case
      try {
        await octokit.rest.git.deleteRef({
          ref: `heads/${CHANGESET_PR_BRANCH_NAME}`,
          ...github.context.repo,
        });
      } catch (e) {
        // do nothing
      }
      await octokit.rest.git.createRef({
        // NOTE: this must be the fully qualified reference (e.g. refs/heads/main)
        ref: `refs/heads/${CHANGESET_PR_BRANCH_NAME}`,
        sha: defaultBranchRef.object.sha,
        ...github.context.repo,
      });
      // NOTE: we don't need to handle the case where we update the changeset file
      // because of the assumptions we make on the timing of this process.
      // See https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
      await octokit.rest.repos.createOrUpdateFileContents({
        path:
          bumpType === 'major'
            ? STANDARD_RELEASE_VERSION_BUMP_CHANGESET_SHORT_PATH
            : ITERATION_RELEASE_VERSION_BUMP_CHANGESET_SHORT_PATH,
        message: 'prepare for new release',
        branch: CHANGESET_PR_BRANCH_NAME,
        content: changesetContent,
        ...github.context.repo,
      });
      const changesetPR = (
        await octokit.rest.pulls.create({
          title: `Prepare New ${
            bumpType === 'major' ? 'Release' : 'Iteration Release'
          }`,
          head: CHANGESET_PR_BRANCH_NAME,
          base: DEFAULT_BRANCH_NAME,
          body: `## ⚠️ Merge this before creating another release!\nAdd changeset to bump version for the next release. Learn more about this process [here](https://github.com/finos/legend-studio/blob/master/docs/workflow/release-process.md#standard-releases).`,
          ...github.context.repo,
        })
      ).data;
      console.log(
        chalk.green(
          `\u2713 Created a PR to push release version bump changeset: ${changesetPR.html_url}`,
        ),
      );
    } catch (error) {
      githubActionCore.error(
        `Failed to create PR for next release version bump changeset. Error:\n${error.message}\n` +
          `Please run \`yarn release:bump major\` and commit this changeset.`,
      );
      process.exit(1);
    }
  }
};

prepareNewStandardRelease();
