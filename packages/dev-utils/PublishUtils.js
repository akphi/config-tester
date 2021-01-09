/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const toThrowError = process.argv.includes('--bail');

const reportError = (msg) => {
  if (toThrowError) {
    throw new Error(msg);
  } else {
    console.log(msg);
    process.exit(1);
  }
};

const checkPublishContent = (dir) => {
  const hasLicenseFile = fs.existsSync(path.resolve(dir, 'LICENSE'));

  if (!hasLicenseFile) {
    reportError(`LICENSE file is required!`);
  }

  const isTypescriptProject = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

  if (isTypescriptProject) {
    const tsConfigFile = require(path.resolve(dir, 'tsconfig.json'));
    if (tsConfigFile.extends) {
      reportError(
        `Typescript project has unresolved \`tsconfig.json\` file! Please flatten it out using '--showConfig' flag.`,
      );
    }
  }
};

module.exports = {
  checkPublishContent,
};
