## TODO Legend Studio

- Handle creation of `version.json`, skip maven - make this part of the build script maybe? - https://www.npmjs.com/package/git-repo-info
- change generating of `config.json` to points at `legend.finos.` by default, clearly that way
- @maoo Enable `dependabot`
- @maoo Setup `codecov`
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) for `cypress` e2e test - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Create an `npx` program to create a site that uses legend studio - see `docusaurus` and `create-react-app` for inspiration. Use `cli` to do so - https://dev.to/iulianoctavianpreda/run-your-npx-script-directly-from-github-create-your-own-cli-commands-and-other-stories-4pn3

# Further Improvements

- Yarn 2 with `PNP` (See `jest` for example - https://github.com/facebook/jest), or NPM 7
- Code-splitting and lazy-loading
  https://github.com/dan-kez/lerna-webpack-example
  https://github.com/jamiebuilds/react-loadable
  https://webpack.js.org/guides/lazy-loading/
  https://reactrouter.com/web/guides/code-splitting
  https://loadable-components.com/
  https://loadable-components.com/docs/loadable-vs-react-lazy/
