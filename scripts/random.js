// const tsc = require('typescript');

// tsc.SyntaxKind

const path = require('path');
const tsc = require('typescript');

// const ts = require(resolve.sync('typescript', {
//   basedir: paths.appNodeModules,
// }));
const config = tsc.readJsonConfigFile(
  path.resolve(__dirname, '../packages/app1/tsconfig.json'),
  tsc.sys.readFile,
);

// console.log(config);
// console.log(tsc.convertToObject(config));
console.log(
  tsc.parseJsonConfigFileContent(
    tsc.convertToObject(config),
    {
      fileExists: () => true,
    },
    '.',
  ),
);

// console.log(
//   tsc
//     .createCompilerHost()
//     .getParsedCommandLine(
//       path.resolve(__dirname, '../packages/app1/tsconfig.json'),
//     ),
// );

// sys.write(JSON.stringify(convertToTSConfig(commandLine, combinePaths(currentDirectory, "tsconfig.json"), sys), null, 4) + sys.newLine);
