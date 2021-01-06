# TODO

- Use `*` for all pacakges missing in sub-modules
- Try out Jest-circus - NOTE in Jest config to remove it when 27 comes out
  https://github.com/vercel/next.js/pull/12974
  https://github.com/facebook/jest/issues/6295
  https://www.npmjs.com/package/jest-circus
- Add repository link to each package

# Contribute TODO

- Look at Yarn Contributing.md
  https://yarnpkg.com/advanced/contributing

- Add github actions to check for changeset indicators
  `yarn version check` -> if fail, prompt user to run locally to produce the changeset
  https://yarnpkg.com/features/release-workflow#commit-history
  -> if passed -> run the next step -> check if there's any bump, if yes, check if changelog is already provided or not

- `FANCY` rewrite `cz-conventional-changelog` to accept `!` in the title and relax all the options
  `use commitizen` with a custom script - https://github.com/commitizen/cz-conventional-changelog/blob/master/index.js
  https://github.com/commitizen/cz-conventional-changelog/blob/master/engine.js
- `FANCY` Add a bot to run
  Learn how `changesets` create its bot to update the message on push, that's nice
  https://github.com/changesets/bot/blob/master/index.ts
  See https://github.com/atlassian/changesets/pull/504
  See https://github.com/atlassian/changesets/pull/501
  https://github.community/t/how-to-use-the-github-actions-bot/16535/2
  https://stackoverflow.com/questions/58468495/how-create-a-comment-on-commit-with-github-actions
- `FANCY` Add a script that uses `oktokit` to fetch information on a PR and produce a suggested changelog
  https://octokit.github.io/rest.js/v18#pulls-update
  Use `inquirer` like `cz-conventional-changelog`

# Release TODO

- Create script to run `yarn version apply --all` and then create a commit and then add tags and then push to git to release
- Add tags to the commit
  Add tags with format `@akphi/lib1@0.0.1` ... and also add a date tag `2020-11-22` like https://github.com/yarnpkg/berry/commit/6b9df772ac785f73e6d08f0fc8c3f1718f296671 - so we can check out using that tag and
  https://yarnpkg.com/features/release-workflow
  need this in the end `git push --follow-tags`
- manually update change log as well to the version we need and cut a header for `Unreleased`

# Publish TODO

- Look at lerna way to copy over over LICENSE files before publish
  https://github.com/lerna/lerna/issues/1213
- Look at this folder for release process using Yarn 2
  https://github.com/yarnpkg/berry/tree/master/scripts/release
  https://github.com/yarnpkg/berry/commit/6b9df772ac785f73e6d08f0fc8c3f1718f296671
- `prepublish`: check LICENSE available and copy publish: yarn workspace each, `postpublish` -> clean up trash
  Look at lerna way to copy over over LICENSE files before publish - https://github.com/lerna/lerna/issues/1213
  verify
  Verify that the
  https://yarnpkg.com/cli/npm/publish
  publish to NPM -> use `yarn workspaces foreach --no-private run yarn npm publish --tolerate-duplicate`
