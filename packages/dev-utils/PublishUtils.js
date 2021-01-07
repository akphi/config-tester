/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const checkPublishContent = (dir) => {
  const hasLicenseFile = fs.existsSync(path.resolve(dir, 'LICENSE'));

  if (!hasLicenseFile) {
    console.log(`LICENSE file is required!`);
    process.exit(1);
  }

  const isTypescriptProject = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

  const tsConfigFile = require(path.resolve(dir, 'tsconfig.json'));

  if (isTypescriptProject && tsConfigFile.extends) {
    console.log(
      `Typescript project has unresolved \`tsconfig.json\` file! Please flatten it out using '--showConfig' flag.`,
    );
    process.exit(1);
  }
};

module.exports = {
  checkPublishContent,
};
