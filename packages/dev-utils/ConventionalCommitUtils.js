const parser = require('conventional-commits-parser');
const spec = require('conventional-changelog-conventionalcommits');

const parseCommit = async function parse(message) {
  const parsed = parser.sync(message, (await spec()).parserOpts);
  parsed.raw = message;
  console.log(parsed);
};

parseCommit('type(miami)!: somehing');
parseCommit('chore!: drop node 8 support\nBREAKING CHANGE something else');
