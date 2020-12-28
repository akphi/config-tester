/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { isBinaryFileSync } = require('isbinaryfile');
const chalk = require('chalk');

const getFileContent = (file) => fs.readFileSync(file, { encoding: 'utf-8' });
const createRegExp = (pattern) => new RegExp(pattern);

const GENERIC_INCLUDE_PATTERNS = [
  /\.[^/]+$/, // files with extension
];

const GENERIC_EXCLUDE_PATTERNS = [
  // nothing
];

const getCopyrightComment = (
  text,
  /**
   * Boolean flag indicating if we are to generate just the content of the comment
   * or the opening/closing syntax for it
   */
  onlyGenerateCommentContent,
  /**
   * TODO: account for file extension to generate different kinds of comments.
   * e.g. `html` comment is a tag `<!-- content -->`
   */
  file,
) => {
  let comment = text
    .trim()
    .split('\n')
    .map((line) => ` *${line.length ? ` ${line}` : ''}`)
    .join('\n');
  if (!onlyGenerateCommentContent) {
    comment = `/**\n${comment}\n */`;
  }
  return comment;
};

const getIncludedPatterns = ({ extensions }) => [
  ...extensions.map((extension) => createRegExp(`\\.${extension}$`)),
];

const needsCopyrightHeader = (copyrightText, file) => {
  const fileContent = getFileContent(file);
  // NOTE: while checking for copyright header, we just generate the copyright comment content
  // not including the full comment (with opening/closing syntax) because potentially the copyright
  // comment might have been merged with another comment.
  const text = getCopyrightComment(copyrightText, true);
  return fileContent.trim().length > 0 && !fileContent.includes(text);
};

// Jest has a fairly complex check for copyright license header that we used as reference
// See https://github.com/facebook/jest/blob/master/scripts/checkCopyrightHeaders.js
const getInvalidFiles = ({
  extensions,
  excludePatterns,
  copyrightText,
  onlyApplyToModifiedFiles,
}) => {
  const files = execSync(
    `git ls-files ${onlyApplyToModifiedFiles ? '--modified' : ''}`,
    { encoding: 'utf-8' },
  )
    .trim()
    .split('\n');

  const includePatterns = getIncludedPatterns({ extensions });

  return files.filter(
    (file) =>
      GENERIC_INCLUDE_PATTERNS.some((pattern) => pattern.test(file)) &&
      includePatterns.some((pattern) => pattern.test(file)) &&
      !GENERIC_EXCLUDE_PATTERNS.some((pattern) => pattern.test(file)) &&
      !excludePatterns.some((pattern) => pattern.test(file)) &&
      fs.existsSync(file) &&
      !fs.lstatSync(file).isDirectory() &&
      !isBinaryFileSync(file) &&
      needsCopyrightHeader(copyrightText, file),
  );
};

const checkCopyrightHeaders = ({
  extensions,
  excludePatterns,
  copyrightText,
  /**
   * NOTE: this location is just used for the report message.
   */
  configFileLocation,
}) => {
  const files = getInvalidFiles({
    extensions,
    excludePatterns,
    copyrightText,
    onlyApplyToModifiedFiles: false,
  });

  if (files.length > 0) {
    console.log(
      `Found ${files.length} file(s) without copyright header:\n${files
        .map((file) => `${chalk.red('\u2717')} ${file}`)
        .join(
          '\n',
        )}\nPlease include the header or exclude the files in '${configFileLocation}'`,
    );
    process.exit(1);
  } else {
    console.log('No issues found!');
  }
};

const updateCopyrightHeaders = async ({
  extensions,
  excludePatterns,
  copyrightText,
  onlyApplyToModifiedFiles,
}) => {
  const files = getInvalidFiles({
    extensions,
    excludePatterns,
    copyrightText,
    onlyApplyToModifiedFiles,
  });

  if (files.length > 0) {
    console.log(
      `Found ${files.length} file(s) without copyright header. Processing...`,
    );
    const copyrightComment = getCopyrightComment(copyrightText, false);
    await Promise.all(
      files.map((file) =>
        fs.writeFile(
          file,
          `${copyrightComment}\n\n${getFileContent(file)}`,
          (err) => {
            console.log(
              `${err ? chalk.red('\u2717') : chalk.green('\u2713')} ${file}`,
            );
          },
        ),
      ),
    );
  } else {
    console.log('All files look good!');
  }
};

module.exports = {
  checkCopyrightHeaders,
  updateCopyrightHeaders,
};
