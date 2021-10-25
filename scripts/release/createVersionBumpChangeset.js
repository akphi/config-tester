import { writeFileSync } from 'fs';
import {
  generateVersionBumpChangeset,
  getPackagesToBumpVersion,
} from './releaseVersionUtils.js';
import chalk from 'chalk';

const bumpType = process.argv[2];
const githubRef = process.argv[3];
const packagesToBump = getPackagesToBumpVersion();
const changesetInfo = generateVersionBumpChangeset(packagesToBump, bumpType);

if (githubRef && githubRef !== 'refs/heads/master') {
  console.log(
    chalk.yellow(
      `Skipped version bump changeset generation: this operation only makes sense for default branch`,
    ),
  );
  process.exit(0);
}

writeFileSync(changesetInfo.path, changesetInfo.content);

console.log(
  [
    'Generated version bump changeset content for application packages:',
    ...packagesToBump.map((line) => chalk.green(`\u2713 ${line}`)),
  ].join('\n'),
);
