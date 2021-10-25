import { writeFileSync } from 'fs';
import {
  generateVersionBumpChangeset,
  getPackagesToBumpVersion,
} from './releaseVersionUtils.js';
import chalk from 'chalk';

const bumpType = process.argv[2];
const packagesToBump = getPackagesToBumpVersion();
const changesetInfo = generateVersionBumpChangeset(packagesToBump, bumpType);

writeFileSync(changesetInfo.path, changesetInfo.content);

console.log(
  [
    'Generated version bump changeset content for application packages:',
    ...packagesToBump.map((line) => chalk.green(`\u2713 ${line}`)),
  ].join('\n'),
);
