# Contributing

Thank you so much for being interested in contributing to our project! Before submitting your contribution, please make sure to take a moment to read through the following guidelines:

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Guidelines](#development-guidelines)
- [License](#license)

We welcome any type of contribution, not only code. You can help with

- **:test_tube: QA**: file bug reports, (see [issue guidelines](#issue-reporting-guidelines))
- **:tada: Marketing**: writing blog posts, howto's, ...
- **:speech_balloon: Community**: presenting the project at meetups, organizing a dedicated meetup for the local community, ...
- **:pencil2: Code**: take a look at the [open issues](https://github.com/akphi/config-tester/issues). Even if you can't write code, commenting on them, engaging in the conversation, showing that you care about a given issue matters. It helps us triage them.

## Issue Reporting Guidelines

Please file issue via our [Github Issues page](https://github.com/akphi/config-tester/issues). Make sure to fill out the issue template or else we might close it due to lack of information.

## Pull Request Guidelines

- It's absolutely fine to break your change down into multiple small commits as you work on the PR - GitHub will automatically squash it before merging; however, please follow our [commit message convention](#commit-convention).
- Adding a `changeset` if applicable (see [changeset](#changeset)).
- Make sure `yarn test` passes (see [development guidelines](#development-guidelines))
- Fill out the pull request template.

### Commit Convention

Commit messages should follow [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/). Commit messages will be automatically validated upon commit. Note that we usually squash commits when merging PR, so the header is likely what we care about, it must follow the format below:

```md
<type>[optional scope][optional '!']: <description>

<!-- Examples
feat: allow provided config object to extend other configs
refactor!: drop support for Node 6
docs: correct spelling of CHANGELOG
fix: correct minor typos in code
-->
```

If you are not familiar with the commit message convention, you can use `yarn commit` instead of `git commit`, which provides an interactive prompt which helps you build compliant commit messages.

> Structuring commit messages this way has many advantages. It's parsable by changelog generation tools. Also, thanks to `type` and `scope` info, this convention encourages contributors to break their work down into smaller units, making it easier to understand and review PRs.

### Changeset

A `changeset` is an intent to release a set of packages at particular [semver bump types](https://semver.org/) with a summary of the changes made. Therefore, for a PR with significant changes (refactoring, maintenance, bug fixes, adding new features), we expect the author to create a `changeset` file which indicates which packages should be re-released due to this change and a brief summary of the changes to be added to release note/changelog. We use [changesets](https://github.com/atlassian/changesets) to manage this process. The command `yarn changeset` will open an interactive prompt which helps you build the changeset.

> Changes like adding documentation or testing are also important, but they don't affect the functionalities of the app and thus never requires a release. As such, you might not need to create a changeset for these changes.

```md
---
'pkg1': minor <!-- this signals us to release a minor version for pkg1 -->
'pkg2': patch <!-- this signals us to release a patch for pkg2 -->
---

An example description of the major changes.

<!--
Please note any breaking changes and potential migration.
Also try to adhere to the format in existing changelogs.
You can follow conventional commit rules for writing message body
See https://www.conventionalcommits.org/en/v1.0.0/
-->
```

## Development Guidelines

> Don't forget to check out the `scripts` section in the root and each workspace `package.json` to explore various development utilities and workflow support that we have.

#### :zap: Setting up your workstation

Make sure you install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/). We highly recommend [Visual Studio Code](https://code.visualstudio.com/). For your IDE, install [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) plugins to help you catch problems while writing code; and install [Prettier](https://prettier.io/) plugin to help you auto-format code.

```sh
# Run the setup script a the root directory of the project to
# install dependencies, linking and setting up workspaces.
yarn setup

# Build all workspaces to make sure your project is in good shape.
yarn build
```

#### :pencil2: Writing code

```sh
# Run the main web app in development mode.
yarn start
```

Each workspace/package in the monorepo should have a `dev` script. Run these (in separate terminal tabs) when you are making changes in these modules to rebuild on change. Otherwise, after making change, you have to manually rebuild the workspace using the `build` script.

#### :construction: Testing your code

Read our [guide on testing](./doc/test-strategy.md) to understand our approach to testing.

```sh
# Use this on root directory or workspace directory to run unit
# and integration test suites.
yarn test
yarn test:watch # rerun tests on changes

# TODO: e2e tests

# Besides, you should run linting to let static analyzer catch
# issues with your code.
yarn lint
yarn lint:fix # this can help you fix some of the issue
```

#### :nail_care: Polishing your code

Don't forget to keep your code nice and tidy. We run `prettier` when you commit your changes, so in terms of formatting, there's not much you need to worry about. However, there are several checks we do when you commit code that you need to take care of.

```sh
# Make sure your code file has proper copyright header.
yarn check:copyright
yarn fix:copyright # Auto add copyright headers to file without it

# Check problems with Typescript project reference.
# See https://www.typescriptlang.org/docs/handbook/project-references.html
yarn check:project-ref

# Check constraints on packages and dependencies.
yarn check:pkg-constraints

# You can also run the optimistic auto-fixer for various
# problems mentioned. Not all problem can be fixed
# automatically, especially ones involving code logic.
yarn fix
```

#### :tada: Checking in your code

Make sure to [create a changeset](#changeset) if you make significant code logic changes. Commit your code with messages following our [convention](#commit-convention). Last but not least, open a PR and follow up on the reviews.

```sh
# Bring up the interactive tool to build changeset
yarn changeset

# Bring up the interactive tool to build commit message
yarn commit
```

#### :package: Releasing

This section is only for maintainers. See the [release guidelines](./doc/release-guide.md).

### Code Conventions

- 2 spaces for indentation (no tabs).
- 80 character line length strongly preferred.
- Prefer `'` over `"`.
- [Latest stable ES](https://github.com/tc39/proposals) syntax when possible.
- Use [TypeScript](https://www.typescriptlang.org/).
- Use semicolons;
- Trailing commas,
- Avd abbr wrds.

## License

By contributing to this project, you agree that your contributions will be licensed under its MIT license.
