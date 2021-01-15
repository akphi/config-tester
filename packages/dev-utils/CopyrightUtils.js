/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const micromatch = require('micromatch');
const { execSync } = require('child_process');
const { isBinaryFileSync } = require('isbinaryfile');
const { getFileContent, createRegExp } = require('./DevUtils');
const chalk = require('chalk');

const GENERIC_INCLUDE_PATTERNS = [
  /\.[^/]+$/, // files with extension
];

const GENERIC_EXCLUDE_PATTERNS = [
  // nothing
];

const generateCopyrightComment = ({
  text,
  /**
   * Optional. This text will be added prior to the copyright content.
   * This is often useful for bundled code.
   * e.g. `@license some-package v1.0.0`
   */
  pkg: { name, version },
  /**
   * Boolean flag indicating if we are to generate just the content of the comment
   * or the opening/closing syntax for it
   */
  onlyGenerateCommentContent,
  /**
   * TODO: account for file extension to generate different kinds of comments.
   * e.g. `html` comment is a tag `<!-- content -->`
   * e.g. `yaml` comment uses `#`
   */
  file,
}) => {
  // TODO: depending on the file type, these params might differ
  const headerPrefix = '/**';
  const contentPrefix = ' *';
  const footerPrefix = ' */';

  let lines = text
    .trim()
    .split('\n')
    .map((line) => `${contentPrefix}${line.length ? ` ${line}` : ''}`);
  if (!onlyGenerateCommentContent) {
    lines = [
      `${headerPrefix}${
        name && version ? ` @license ${name} v${version}` : ''
      }`,
      ...lines,
      footerPrefix,
    ];
  }
  return lines.join('\n');
};

const getIncludedPatterns = ({ extensions }) => [
  ...extensions.map((extension) => createRegExp(`\\.${extension}$`)),
];

const needsCopyrightHeader = (copyrightText, file) => {
  const fileContent = getFileContent(file);
  // NOTE: while checking for copyright header, we just generate the copyright comment content
  // not including the full comment (with opening/closing syntax) because potentially the copyright
  // comment might have been merged with another comment.
  const text = generateCopyrightComment({
    text: copyrightText,
    pkg: {},
    onlyGenerateCommentContent: true,
  });
  return fileContent.trim().length > 0 && !fileContent.includes(text);
};

// Jest has a fairly sophisticated check for copyright license header that we used as reference
// See https://github.com/facebook/jest/blob/master/scripts/checkCopyrightHeaders.js
const getInvalidFiles = ({
  extensions = [],
  /* micromatch glob patterns */
  excludePatterns = [],
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
      !micromatch.isMatch(file, excludePatterns) &&
      fs.existsSync(file) &&
      !fs.lstatSync(file).isDirectory() &&
      !isBinaryFileSync(file) &&
      needsCopyrightHeader(copyrightText, file),
  );
};

const checkCopyrightHeaders = ({
  extensions = [],
  /* micromatch glob patterns */
  excludePatterns = [],
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
  extensions = [],
  /* micromatch glob patterns */
  excludePatterns = [],
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
    const copyrightComment = generateCopyrightComment({
      text: copyrightText,
      pkg: {},
      onlyGenerateCommentContent: false,
    });
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
  generateCopyrightComment,
  checkCopyrightHeaders,
  updateCopyrightHeaders,
};
