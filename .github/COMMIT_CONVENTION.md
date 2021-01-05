## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) and [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)

### Overview

The commit message must match the following regular expression:

```js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?!?: .{1,50}/;
// <type>(<scope>): <subject>
// e.g. feat(core): add new option for plugin
// e.g. fix(core): handle garbage collection
// e.g. chore(deps): update typescript to v4
// e.g. chore(deps): update typescript to v4
```

### Examples

Appears under "Features" header, `core` subheader:

```
feat(core): add 'comments' option
```

Appears under "Bug Fixes" header, `compiler` subheader, with a link to issue #28:

```
fix(compiler): handle garbage collection

close #28
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(core)!: improve vdom diffing by removing 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(compiler): add 'comments' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>)(!): <subject>
  │       │     │       │
  │       │     │       └───⫸ Subject [required]: A short summary of the changes
  │       │     │
  │       │     └───⫸ Breaking Change Notice [optional]: Further clarify the breaking change in the footer
  │       │
  │       └────⫸ Commit Scope [optional]: core|compiler|...
  │
  └───⫸ Commit Type [required]: feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|...

<BLANK LINE>

<body>  ───────⫸ Body [optional]: Include documentation/context/motivation of the changes

<BLANK LINE>

<footer> ──────⫸ Footer: Other information like BREAKING CHANGES or referenced issues
```

For the **header**, the **type** and **summary** are mandatory while the **scope** is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `docs`, `chore`, `style`, `refactor`, and `test` for non-changelog related tasks.

### Scope

The scope could be anything specifying the place of the commit change. For example: `core`, `transition` etc...

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

> This section is often optional but highly recommended. This is a good place to put documentation with references to RFCs, issues, literatures... Documentation like this often provide invaluable contextual knowledge on the change and it is saved permanantly by Git so it does not become lost over time like code comments.

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
