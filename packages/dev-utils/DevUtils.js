const fs = require('fs');

const getFileContent = (file) => fs.readFileSync(file, { encoding: 'utf-8' });
const createRegExp = (pattern) => new RegExp(pattern);

module.exports = {
  getFileContent,
  createRegExp,
};
