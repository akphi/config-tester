# TODO

- Upgrade to Yarn 2 light mode only (follow Babel and Jest)
- `DOC` Adopt Jest workflow for publishing (manually insert) - doc for CONTRIBUTING
- If all good, ditch `lerna` and use `yarn workspace foreach` for scripts
  https://yarnpkg.com/cli/workspaces/foreach

- `FANCY` Add a bot to check pipeline for when PR is opened to see if it needs a changelog update
  https://github.community/t/how-to-use-the-github-actions-bot/16535/2
  https://stackoverflow.com/questions/58468495/how-create-a-comment-on-commit-with-github-actions
- `FANCY` Add a script that uses `oktokit` to fetch information on a PR and suggest changelog
  Use `inquirer` like `cz-conventional-changelog`
- `FANCY` rewrite `cz-conventional-changelog` to accept `!` in the title and relax all the options
- Add doc about `publisher` tool in `monorepo.md` - also add things to do as TODO with `>` section
  Also add a note about `changesets` -> nice but we need to keep watching
  `use commitizen` with a custom script - https://github.com/commitizen/cz-conventional-changelog/blob/master/index.js
  https://github.com/commitizen/cz-conventional-changelog/blob/master/engine.js
  Highlight the fact that we should have changelogs for each package, but we don't quite need right now until we follow `semver`

- Try to follow Yarn 2 release workflow
  https://yarnpkg.com/features/release-workflow
- Try to do a github release
- Try to publish something to `NPM` and consume it back somewhere else, try a dummy utility function with typings.

# TODO

- "publish:monorepo": "yarn build && lerna version && lerna publish from-git",
- Try to use `atlassian/changesets`: see how it works with `conventional-commit`
  https://github.com/atlassian/changesets/issues/480
  https://github.com/FormidableLabs/urql/blob/85a0946ed83559988b228a605df0b26e49d40c51/scripts/changesets/changelog.js
  https://github.com/atlassian/changesets/blob/master/packages/cli/src/changelog/index.ts
  https://github.com/atlassian/changesets/blob/master/packages/changelog-git/src/index.ts
  https://github.com/atlassian/changesets/blob/master/packages/changelog-github/src/index.ts
  https://github.com/atlassian/changesets/blob/master/docs/modifying-changelog-format.md
- Setup github bot and actions for `atlassian/changesets`
  https://github.com/keystonejs/keystone/blob/master/.github/workflows/release.yml
  https://johno.com/changesets/
  https://medium.com/@jakeginnivan/a-great-typescript-npm-module-mono-repo-setup-e737937210
- Migrate to Yarn 2 when we have change -> eliminate `lerna`
  https://next.yarnpkg.com/getting-started/install
  https://yarnpkg.com/cli/workspaces/foreach
  https://github.com/yarnpkg/yarn/issues/7121
  https://github.com/yarnpkg/yarn/issues/4467
  BLOCKER - ESM not supported - https://github.com/yarnpkg/berry/issues/638
  -> DO NOT USE PNP yet then - `nodeLinker: node-modules` - https://stackoverflow.com/questions/60012394/how-to-turn-off-yarn2-pnp
