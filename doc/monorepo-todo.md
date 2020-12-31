# TODO

- Script to add paths module aliases in TSConfig to Jest and Webpack - try `babel-plugin-module-resolver` if not delete
- Try to publish something to `NPM` and consume it back somewhere else, try a dummy utility function with typings and do CommonJs as well????

# Conventional commits

- Follow commit message format in vue.js
- Consider add section in `CONTRIBUTING.md` on commit message format
  https://github.com/torvalds/subsurface-for-dirk/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88
- Improve `CONTRIBUTING.md` with reference to this
  https://github.com/rollup/plugins/blob/master/.github/CONTRIBUTING.md
- Consider using conventional-commits
  https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md
  See `fork-ts-checker-webpack-plugin` `changelog.config.json` for example file
  https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary
  https://github.com/conventional-changelog/conventional-changelog
  https://github.com/facebook/docusaurus/blob/master/CONTRIBUTING.md#semantic-commit-messages

# Bundle size issues

- check `react-icons` bundling shenanigan
  https://github.com/patternfly/patternfly-react/issues/3268
  https://github.com/react-icons/react-icons/issues/154
- add `externals: [monaco-editor, react, react-dom, material-ui]` to webpack
- Try to have `monaco` in `component1` and `app1` to see if it gets duplicated:
  - do experiment with https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97
  - then try to create a file that `export *` and re-measure bundlesize
  - otherwise, TRY create our own module to load `monaco-editor`
    https://webpack.js.org/guides/code-splitting/

# Webpack 5

- Upgrade to non-beta

# ESM

- `jest` with ESM so we can eliminate the `cjs` build for `rollup`
