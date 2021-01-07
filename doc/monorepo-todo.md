# TODO

- `FANCY` rewrite `cz-conventional-changelog` to accept `!` in the title and relax all the options
  `use commitizen` with a custom script - https://github.com/commitizen/cz-conventional-changelog/blob/master/index.js
  https://github.com/commitizen/cz-conventional-changelog/blob/master/engine.js
  Use `inquirer` like `cz-conventional-changelog`
  Only care about the one liner really, ask breaking change? first and then limit to 72 chars and do not show breaking cahnges when change is of type `docs` or so

- Look at Yarn Contributing.md
  https://yarnpkg.com/advanced/contributing

# Contribute TODO

- Add github actions to check for changeset indicators
  `yarn version check` -> if fail, prompt user to run locally to produce the changeset
  https://yarnpkg.com/features/release-workflow#commit-history
  -> if passed -> run the next step -> check if there's any bump, if yes, check if changelog is already provided or not

# Release TODO

- Create script to run `yarn version apply --all` and then create a commit and then add tags and then push to git to release
- Add tags to the commit
  Must use annotated tags
  https://alblue.bandlem.com/2011/04/git-tip-of-week-tags.html#:~:text=If%20the%20tag%20is%20an,see%20only%20the%20commit%20object.&text=If%20the%20current%20commit%20exactly,the%20tag%20name%20is%20printed.
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
