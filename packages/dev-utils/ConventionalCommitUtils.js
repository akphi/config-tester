/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');
const conventionalCommitTypes = require('conventional-commit-types');

// This code is adapted from `cz-conventional-changelog`
// See https://github.com/commitizen/cz-conventional-changelog
const createCommitizenPrompter = function () {
  // This is the length of Github commit title, more than this and the commit will get truncated
  const MAXIMUM_HEADER_LENGTH = 72;

  const maxSummaryLength = (answers) =>
    MAXIMUM_HEADER_LENGTH -
    (answers.type.length +
      (answers.scope ? answers.scope.length + 2 : 0) +
      2 + // the colon and the space before subject
      (answers.isBreaking ? 1 : 0));

  // summary must not end have leading/trailing spaces and must not end with a period
  const formatSummary = function (subject) {
    subject = subject.trim();
    while (subject.endsWith('.')) {
      subject = subject.slice(0, subject.length - 1);
    }
    return subject;
  };

  // build `type` options
  const types = conventionalCommitTypes.types;
  const typeOptionLength =
    Object.keys(types)
      .map((types) => types.length)
      .reduce((a, b) => Math.max(a, b), Number.MIN_SAFE_INTEGER) + 1;
  const choices = Array.from(Object.entries(types)).map(([key, type]) => ({
    name: `${`${key}:`.padEnd(typeOptionLength)} ${type.description}`,
    value: key,
  }));

  return {
    // `commitizen` prompter will take 2 arguments
    // `inquirerInstance` which is just an instance of inquirer.js.
    // and a commitFn that takes the commit message to execute `git commit`
    prompter: function (inquirerInstance, commitFn) {
      inquirerInstance
        .prompt([
          {
            type: 'list',
            name: 'type',
            pageSize: choices.length,
            message: "Select the type of change that you're committing:",
            choices: choices,
          },
          {
            type: 'input',
            name: 'scope',
            message:
              'What is the scope of this change (e.g. component or file name): (press enter to skip)',
            filter: (value) => value.trim(),
          },
          {
            type: 'confirm',
            name: 'isBreaking',
            message: 'Are there any breaking changes?',
            default: false,
          },
          {
            type: 'input',
            name: 'subject',
            message: (answers) =>
              `Write a short, imperative tense description of the change (max ${maxSummaryLength(
                answers,
              )} chars):\n`,
            validate: (subject, answers) => {
              const filteredSubject = formatSummary(subject);
              return filteredSubject.length === 0
                ? 'subject is required'
                : filteredSubject.length <= maxSummaryLength(answers)
                ? true
                : `Subject length must be less than or equal to ${maxSummaryLength(
                    answers,
                  )} characters. Current length is ${
                    filteredSubject.length
                  } characters.`;
            },
            transformer: (subject, answers) => {
              const filteredSubject = formatSummary(subject);
              const color =
                filteredSubject.length <= maxSummaryLength(answers)
                  ? chalk.green
                  : chalk.red;
              return color(`(${filteredSubject.length}) ${subject}`);
            },
            filter: function (subject) {
              return formatSummary(subject);
            },
          },
        ])
        .then((answers) => {
          // parentheses are only needed when a scope is present
          const scope = answers.scope ? `(${answers.scope})` : '';
          // breaking change adds a exclamation point before the colon
          const breakingChangeIndicator = answers.isBreaking ? '!' : '';
          const header = `${answers.type}${scope}${breakingChangeIndicator}: ${answers.subject}`;
          commitFn(header);
        });
    },
  };
};

module.exports = {
  createCommitizenPrompter,
};
