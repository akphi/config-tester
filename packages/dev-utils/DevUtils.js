import { readFileSync } from 'fs';

export const getFileContent = (file) =>
  readFileSync(file, { encoding: 'utf-8' });
export const createRegExp = (pattern) => new RegExp(pattern);

const exit = (msg, code) => {
  console.log(msg);
  process.exit(code);
};
export const exitWithError = (msg) => exit(msg, 1);
export const exitWithSuccess = (msg) => exit(msg, 0);
export const exitOrThrowError = (msg, throwError = true) => {
  if (throwError) {
    throw new Error(msg);
  } else {
    exitWithError(msg);
  }
};

// NOTE: unlike `require`, ESM `import` does not support JSON files without the flag --experimental-json-modules
// being specified, which is not convenient at all in our setup. So we will use the following approach to load them
export const loadJSON = (path) => JSON.parse(getFileContent(path));
