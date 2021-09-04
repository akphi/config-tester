const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '../..');

try {
  const allTags = execSync(`git tag -l`, { encoding: 'utf-8', cwd: ROOT_DIR })
    .split('\n')
    .filter(Boolean);
  const tagsToRemove = allTags.filter((tag) => !tag.startsWith('v'));
  // console.log(allTags);

  tagsToRemove.forEach((tag) => {
    try {
      execSync(`git tag -d ${tag}`, {
        cwd: ROOT_DIR,
        stdio: ['pipe', 'pipe', 'inherit'], // only print error
      });
    } catch (error) {
      console.log(
        `Failed to delete tag: ${tag}. Please manually delete this tag and push using \`git push --follow-tags\`. Error:\n${error.message}`,
      );
    }
  });
  // // NOTE: this log message is needed so that `changesets/action` can pick up the published version
  // // and create Github release accordingly
  // // See https://github.com/changesets/action/blob/master/src/run.ts
  // console.log('New tag: ', tag);
} catch (error) {
  console.log(
    `Failed to delete some tags. Please manually delete tags created and push using \`git push --follow-tags\`. Error:\n${error.message}`,
  );
}
