# TODO

- `FANCY` Add a bot to run
  `yarn version check` -> if fail, prompt user to run locally to produce the changeset
  -> if passed -> run the next step -> check if there's any bump, if not

  check pipeline for when PR is opened to see if it needs a changelog update
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

- Adjust
- Create a github action to do a release???
  https://github.com/actions/create-release
- Create manual github action to push to NPM

- Try to follow Yarn 2 release workflow
  https://yarnpkg.com/features/release-workflow
- Try to do a github release
- Try to publish something to `NPM` and consume it back somewhere else, try a dummy utility function with typings.

- Try out Jest-circus - NOTE in Jest config to remove it when 27 comes out
  https://github.com/vercel/next.js/pull/12974
  https://github.com/facebook/jest/issues/6295
  https://www.npmjs.com/package/jest-circus
