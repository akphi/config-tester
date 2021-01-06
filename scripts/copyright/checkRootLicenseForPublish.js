const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const toFix = argv.fix;
const workspaceDir = argv.workspaceDir;

const hasLicenseFile = fs.existsSync(path.resolve(workspaceDir, 'LICENSE'));
if (!hasLicenseFile && !toFix) {
  console.log('no LICENSE', workspaceDir);
  process.exit(1);
}

// // console.log('asdasd', process.cwd(), __dirname);
// console.log('asdasd', workspaceDir, __dirname);
// if (toFix) {
//   //   const onlyApplyToModifiedFiles = process.argv.includes('--modified');
//   //   updateCopyrightHeaders({
//   //     ...config,
//   //     onlyApplyToModifiedFiles,
//   //   });
//   // } else {
//   //   checkCopyrightHeaders({
//   //     ...config,
//   //     configFileLocation: 'scripts/copyright/copyright.config.js',
//   //   });
// }
