## TODO Legend Studio

- Handle creation of `version.json`, skip maven - make this part of the build script maybe? - https://www.npmjs.com/package/git-repo-info
- change generating of `config.json` to points at `legend.finos.` by default
- @maoo Enable `dependabot`
- @maoo Setup `codecov`
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) for `cypress` e2e test - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Create an `npx` program to create a site that uses legend studio - see `docusaurus` and `create-react-app` for inspiration. Use `cli` to do so - https://dev.to/iulianoctavianpreda/run-your-npx-script-directly-from-github-create-your-own-cli-commands-and-other-stories-4pn3
- Refer to `rollup` for:
  - issue template (Modification/New Plugin/ etc.) - https://github.com/rollup/plugins/issues/new/choose
  - `CONTRIBUTING.md` - See introduction section - https://github.com/rollup/plugins/blob/master/.github/CONTRIBUTING.md

# Things to consider

- Try to use Yarn 2 with `PNP` and `Zero-Installs`
  BLOCKER - ESM not supported - https://github.com/yarnpkg/berry/issues/638
- Code-splitting and lazy-loading
  https://github.com/dan-kez/lerna-webpack-example
  https://github.com/jamiebuilds/react-loadable
  https://webpack.js.org/guides/lazy-loading/
  https://reactrouter.com/web/guides/code-splitting
  https://loadable-components.com/
  https://loadable-components.com/docs/loadable-vs-react-lazy/
- Consider publishing to Github Pacakge Manager (as well - this is a different registry than NPM) - https://npm.pkg.github.com
  https://medium.com/@chamodshehanka/npm-and-github-package-registry-55ae9eaeb29d
  https://docs.github.com/en/free-pro-team@latest/packages/learn-github-packages/about-github-packages
