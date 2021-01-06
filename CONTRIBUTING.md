# Contributing

Thank you so much for being interested in contributing to our project! Before submitting your contribution, please make sure to take a moment to read through the following guidelines:

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Guidelines](#development-guidelines)
- [License](#license)

## Issue Reporting Guidelines

Always file issue via our [Github Issues page](https://github.com/akphi/config-tester/issues). Make sure to fill out the issue template or else we might close it due to lack of information.

## Pull Request Guidelines

- It's absolutely fine to break your change down into multiple small commits as you work on the PR - GitHub will automatically squash it before merging; however, please follow our [commit message convention](#commit-convention).
- Update the `CHANGELOG.md` file if applicable (see [updating changelog guidelines](#updating-changelog)).
- Make sure `yarn test` passes (see [development guidelines](#development-guidelines))
- Fill out the pull request template.

### Commit Convention

Commit messages should follow [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/). Commit messages will be automatically validated upon commit.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

```
# Examples

feat: allow provided config object to extend other configs
refactor!: drop support for Node 6
docs: correct spelling of CHANGELOG
fix: correct minor typos in code
```

If you are not familiar with the commit message convention, you can use `yarn commit` instead of `git commit`, which provides an interactive CLI for generating proper commit messages.

> The purpose of following this convention is not just to provide more structured and informative commit message, but also to encourage contributors to break their work into smaller chunks, making it easier to review PRs. Also, based on these commit messages, we can potentially help generate changelog entry.

### Updating Changelog

All changes that add a feature to or fix a bug in any packages require a changelog entry containing the names of the packages affected, a description of the change, and the number of and link to the pull request. Try to match the structure of the existing entries.

For significant changes to the documentation or website and things like cleanup, refactoring, and dependency updates, the `Chore & Maintenance` section of the changelog can be used.

Examples:

```md
- `[component1]` Use new React JSX Transform ([#90](https://github.com/org/repo/pull/90))
- `[lib1]` [**BREAKING**] Migrate to ESM ([#77](https://github.com/org/repo/pull/77))
```

You can add or edit the changelog entry in the GitHub web interface once you have opened the pull request and know the number and link to it.

Make sure to alphabetically order your entry based on package name. If you have changed multiple packages, separate them with a comma.

> Some philosophy thing

## Development Guidelines

0. Prerequisite: Node, Yarn, vscode, vscode plugins (ESLint, Prettier, Stylelint)
1. Setup: Install (bootstrap), Create config files, etc.
2. Develop:

- Refer to developer scripts section in `codesandbox` README.md

3. Build

- Test
- Lint
- Code formatter (can be run as part of pre commit hook)

3. Commit

- `DOC` Adopt Jest workflow for publishing (manually insert) - doc for CONTRIBUTING

6. Release
   TODO

### Commonly used NPM scripts

7. Publish: Versioning / Publish

   https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d
   https://github.com/lerna/lerna/blob/main/commands/version
   https://github.com/lerna/lerna/tree/main/commands/publish
   https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli
   https://medium.com/@debshish.pal/publish-a-npm-package-locally-for-testing-9a00015eb9fd
   https://classic.yarnpkg.com/en/docs/cli/link/
   https://classic.yarnpkg.com/en/docs/cli/publish/
   https://classic.yarnpkg.com/en/docs/publishing-a-package/

### Code Conventions

- 2 spaces for indentation (no tabs).
- 80 character line length strongly preferred.
- Prefer `'` over `"`.
- [Latest ES](https://github.com/tc39/proposals) syntax when possible.
- Use [TypeScript](https://www.typescriptlang.org/).
- Use semicolons;
- Trailing commas,
- Avd abbr wrds.

## License

By contributing to this project, you agree that your contributions will be licensed under its MIT license.
