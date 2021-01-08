# Dependencies

## Adding a Dependency

There could be [a fair number of downsides](https://github.com/artsy/README/blob/master/playbooks/dependencies.md) to adding a new dependency, such as larger bundle size, upgrade chores, less flexibility, slower migration, and the risk of the dependency becoming vulnerable or abandoned. On the other hand, if we choose to opt out and build the exact implementation that addresses just our needs, there is the cost of development and maintenance.

When consider adding a new dependency, you need to communicate with the team in forms of an RFC (or a detailed explanation in PRs). Following is a list of points to consider - if you answer `yes` to most of these questions, then you probably don’t need to write an RFC:

- Could you fit this codebase in your head after reading the source?
- Is this obviously being used in production by the maintainers, and thus battle-tested?
- Are the dependencies of this dependency already in our projects, or is the dependency itself a transitive dependency of another dependency we already rely on?
- Would this dependency be the first time we’ve needed something of this domain?
- Do you feel well versed in the domain of this dependency and/or could maintain it if that needs to become an option?

Other parameters (no order implied) to consider are:

- **Popularity:** As superficial as it may sound, we care somewhat about `github stars` and `npm downloads`. This is a compound index, which usually implies several metrics below. In general, it implies better community support (issues found and resolved), and adoption
- **Stability:** _Is this library the industry standard, is it battle-tested and used by large and other popular project?_
- **Maintainer/Contribution Activity:** _Is this library still actively maintained?_, _How often bug fixes are released and issues are addressed?_
- **Documentation:** _Does the library have good docs, example, and rich set of API which covers some feature we might be interested in in the future?_
- **Issues:** _Does this library currently have any blockers in terms of security, performance?_, _Does it affect our usage/upgrade/migration for another dependency?_

## Updating a Dependency

We can seem quiet _conservative_ about adding a new dependency, but when we already introduced it, we are very open to keeping it up-to-date. In fact, we encourage our team to check and update dependencies **as soon and as often as possible**. Of course, this applies to only `minor` and `patch` updates; for `major` version bumps, we need to evaluate the risk and effort as it can be considered as arduous as adding new dependencies.

## Dependencies to Track

This list keeps track of dependencies which are either unstable or blockers to certain development in our project. Unstable dependencies are usually marked with tag `@next`, or currently in `alpha`, `beta` channels. These dependencies are sometimes ignored by dependency bots or `yarn upgrade` so we must manually keep track of them here to remind us to come back and upgrade them once stable versions are released.

| Package                                                                                        | Why?                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) | Using `beta` version. Part of `webpack@5` upgrade                                                                                                                                                                                |
| [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)                         | Using `beta` version. Part of `webpack@5` upgrade ([tracker](https://github.com/jantimon/html-webpack-plugin/issues/1527))                                                                                                       |
| [jest](https://github.com/facebook/jest)                                                       | Jest does not [fully support ESM](https://github.com/facebook/jest/issues/9430) so we still need to publish CJS bundle for our packages. Also `Jest@27` supposes to use `jest-circus` by default which offers better performance |
| [webpack-dev-server](https://github.com/webpack/webpack-dev-server)                            | Using `beta` version. Part of `webpack@5` upgrade ([tracker](https://github.com/webpack/webpack-dev-server/milestone/4))                                                                                                         |
| [yarn (v2 - berry)](https://github.com/yarnpkg/berry)                                          | [PnP](https://yarnpkg.com/features/pnp) is nice but [currently does not support ESM](https://github.com/yarnpkg/berry/issues/638) so we have to use `node_modules` as node linker mechanism                                      |
