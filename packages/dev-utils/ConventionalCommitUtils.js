/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const parser = require('conventional-commits-parser');
const spec = require('conventional-changelog-conventionalcommits');

const parseCommit = async function parse(message) {
  const parsed = parser.sync(message, (await spec()).parserOpts);
  parsed.raw = message;
  console.log(parsed);
};

module.exports = {
  parseCommit,
};
