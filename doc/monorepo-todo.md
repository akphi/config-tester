# TODO

- add doc for ESM in monorepo and our strategy for using `externals` -> yeah! (talk about `monaco-editor`, etc.), - `jest` with ESM so we can eliminate the `cjs` build for `rollup` - talk about lodash as well - https://www.npmjs.com/package/lodash-es
- `monaco-editor` ESM
  `import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';` -> `import * as monaco from 'monaco-editor';`
  https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97

- Consider tidying up the `paths` of `tsconfig.json` using - `tsconfig-paths` and `tsconfig-paths-webpack-plugin` - https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
  https://www.npmjs.com/package/@rollup/plugin-alias
  Script to add paths module aliases in TSConfig to Jest and Webpack - try `babel-plugin-module-resolver` if not delete

  - webpack/jest/rollup from `tsconfig` path =.='

- Try to publish something to `NPM` and consume it back somewhere else, try a dummy utility function with typings and do CommonJs as well????

# Release process

- Look at `webpack-cli`
  https://webpack.js.org/contribute/release-process/#releasing
  https://github.com/webpack/webpack-cli/blob/master/.github/CONTRIBUTING.md#releasing
  https://github.com/webpack/webpack-cli/blob/master/lerna.json
  https://github.com/webpack/webpack-cli/blob/master/package.json

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
