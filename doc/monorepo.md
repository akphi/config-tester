# Monorepo

This is not a "dissertation" on the concept of monorepo (mono-repo) nor a discussion thread on why we should or should not use monorepo. This is a technical record of how we transform our monolithic codebase into a monorepo project. In the following sections, we will discuss our approach and implementation with regards to tooling and the development workflow in a monorepo project.

## Approach

The life-cycle of a codebase roughly comprises the following phases:

- `setup` installing dependencies and linking modules to establish the module dependency graph.
- `develop` watch and auto-rebuild module (potentially serve the app) on code changes, other tasks might include testing and linting.
- `build` build and bundle module to prepare artifacts for packaging and `publish`
- `publish` version and publish the module(s) to module registry (e.g. NPM), other tasks might include deploying.

Among these, the `setup` phase and the `publish` phase are rarely run; besides, thanks to tooling support, they are fairly trivial to do in a monorepo project. Our impressions with the `publish` phase is that it's more about the convention (involving changelogs, commit messages, version tags, semver, etc.) rather than the implementation that is cumbersome.

The `build` phase is often very similar to the `develop` phase, if not a bit more simplified, as it is run as one operation; whereas `develop` often involves watching for changing and trigger re-building on changes, which requires caching and thus, a more sophisticated tooling stack. This is where we realize the biggest challenge when setting up our monorepo project: it's hard to keep the same `watch` behavior while developing on a monorepo project.

For example, let's consider the following common scenario, we have 3 modules:

- `lib-A`: shared library and utilities
- `component-B`: a `react` component that uses utility methods from `lib-A`, this module will have a CSS stylesheet.
- `app-C`: an webapp that has an entry point as a HTML document that loads a `react` app that uses `component-B`. Modules like these are often considered the leaves and should not be depended on by any other modules.

When the codebase was still monolithic, everything is squashed into just `app-C`, we can make change anywhere (be it in the stylesheets, HTML documents, or Javascript modules) and the devtool will be able to trigger rebuild and reload the webapp being served in the browser. This has been our standard development workflow so far. However, when the codebase is a monorepo, setting up the watcher is much trickier. If we set them up to watch for changes across all the modules, this not only runs the risk of lacking devtool support, but also defeats the scalability aspect of monorepo.

As we are so used to thinking of the codebase as one entity, at first, we wasted a huge amount of time trying to bend the devtool to our will by parallelizing our terminal processes in order to watch-and-rebuild all modules at the same time. We learned it the hard way that the most natural solution is simply to respect the module boundary and hierarchy. In other words, every time when there are changes in a child module, we must re-build that module first and somehow find a way to signal the dependent modules to re-build. If the devtools do not support this mechanism, we would, instead, have to manually rebuild and re-run the webapp server. _Come to think about it, to a Java developer, this is the default development workflow, which goes to show how devtools could really influence our way of thinking (for better or worse)._

## Implementation

Our monolithic codebase has a fairly standard setup, nothing far from a project created using [create-react-app](https://create-react-app.dev/): we use [React](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/) for type-checking, [Webpack](https://webpack.js.org/) for bundling, [Babel](https://babeljs.io/) for transpiling, [ESLint](https://eslint.org/) for linting, [Sass](https://sass-lang.com/) for styling, and [Jest](https://jestjs.io/) for testing.

At the point of writing, the most prominent package managers like [NPM](https://docs.npmjs.com/cli/v6/commands/npm) and [Yarn](https://yarnpkg.com/package/yarn) have support for monorepo project via the `workspaces` feature. Nevertheless, we have opted in to using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) because firstly, the NPM counterpart is still [work-in-progress](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and secondly, we have already used `Yarn` as our default package manager thanks to its richer feature set.

With this, we could start shaping our codebase in monorepo structure. The following section details the tooling support and setup

### Lerna

[Lerna](https://lerna.js.org/) is **not essential** for working with a monorepo project; however, it helps optimize the workflow around managing monorepo project, especially with the `setup` and `publish` phase.

> One of the most important feature of `lerna` is the ability to run task in topologically-sorted order (similar to [Maven](https://maven.apache.org/)). One particularly popular lerna command is [`bootstrap`](https://github.com/lerna/lerna/tree/main/commands/bootstrap), which is [made redundant](https://github.com/lerna/lerna/issues/1308#issuecomment-370848535) by `Yarn workspaces`, but the [`run`](https://github.com/lerna/lerna/tree/main/commands/run) command is still very useful for running script in topological order.

### Webpack

For modules with non-JS code, such as `HTML` or `Sass` - similar to `component-B` and `app-C` - the devtool operations require multiple steps. For `build` phase can be broken down into a series of steps, e.g. `build:typescript && build:sass && build:html && ...`. However, for `develop` phase, it implies we either have to:

- run `watch` processes in parallel: `<run-script-in-parallel> watch:typescript watch:sass ...`
- or, use tools like `webpack` or `gulp` to collate those tasks into one `atomic` operation.

The latter is the option we choose to go with for both `build` and `develop`. We pick `webpack` because it is mature, highly customizable, and because it has a [rich and mature set of plugins](https://webpack.js.org/plugins/) for code processing as well as an out-of-the-box `watcher` with [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) support and [`dev-server`](https://webpack.js.org/configuration/dev-server/) which are extremely powerful for development.

> [`parcel`](https://parceljs.org/) and [`rollup`](https://rollupjs.org/guide/en/) are [decent and simpler alternatives](https://blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/) to `webpack` but due to the lack of support for certain plugins, and the fact that our monolithic codebase already used `webpack` we decide to evaluate these tools later.

In terms of development workflow, for leaf modules like webapp `app-C`, when we rebuild modules that `app-C` depends on, `webpack-dev-server` should be able to pick up this change and either reload the app or `hot-replace` its module without refreshing the web page.

### Typescript and Babel

There are 2 ways to process Typescript code:

- Using Typescript compiler [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html). `tsc` does type-checking and thus is able to create type declaration `*.d.ts` files. However, for project with codes other than Typescript, we cannot rely on `tsc` alone for `build` phase. Therefore, `tsc` is good only for library module like `lib-A`.
- Using `babel` plugin [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript). Note that `babel` [does not do type-checking](https://babeljs.io/docs/en/#type-annotations-flow-and-typescript). To a certain extent this is the desired behavior for `develop` phase since we can rebuild the project faster. Also, `babel` supports many plugins and [output runtime target](https://www.google.com/search?q=typescript+support+target+runtime&rlz=1C5CHFA_enUS781US781&oq=typescript+support+target+runtime&aqs=chrome..69i57j33i160.8648j0j1&sourceid=chrome&ie=UTF-8) which `tsc` doesn't.

As such, the [recommended](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html) [strategy](https://github.com/microsoft/TypeScript-Babel-Starter) is to use `tsc` only for library module, and for modules targeting the web or modules having non-JS code, we use `babel` for transpiling Typescript code to Javascript and use `tsc` only to type-check and build type declaration file.

Typescript has a niche feature that can be used to facilitate monorepo structure called [Project Reference](https://www.typescriptlang.org/docs/handbook/project-references.html). It manages the dependency graph between modules just like what `lerna` does but with caching specialized for the Typescript compiler [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

> A downside of using `project reference` is [tediousness](https://github.com/microsoft/TypeScript/issues/25376), we need to specify all projects (modules) on top level `tsconfig` and all referenced projects in the module `tsconfig`, hence duplicating declaration of dependencies in `package.json`. See [example](https://github.com/RyanCavanaugh/learn-a).

In the `build` phase, `tsc` will be used to create type declaration `*.d.ts`. Since `tsc` [does not support target runtime](https://github.com/microsoft/TypeScript/issues/19183) (i.e. browser polyfill), we would use `tsc` to build only library modules - similar to `lib-A`. For `develop` phase, we can run `tsc -b -w` at root as a separate terminal process for type-checking.

`babel` will be used `webpack` for both `develop` and `build` for modules similar to `component-B` and `app-C`.

### IDE

We use [Visual Studio Code (vscode)](https://code.visualstudio.com/). `vscode` seems to naturally support monorepo, the only thing we need to do is to ensure running `yarn install` so modules are linked properly, `Go to definition (Ctrl + Click)` should work nicely without any other config.

> The most important setup for VSCode to work is for Typescript. If we use project reference, we don't seem to need `paths` to be able to have auto-imports work properly in VSCode. However, we must go to auto-imports setting and change it to `on` instead of `auto` as this might hide away imports from our monorepo modules.<br/><br/>An example of this is when you have a module `@something/a` that depends on`@something/b`. `@something/b` exports a function called `helloworld()`. While working in `@something/a`, we type `hellow` at this point, `helloworld` should have been suggested but it doesn't. However, when we manually import `helloworld` by specifying `import { helloworld } from '@something/b'` it works just fine, which means our setup is correct. At this point, forcing `auto-imports` to be `on` in VSCode settings solves the issue

## References

[Developing in a Large Monorepo - Jai Santhosh - JSConf Korea](https://www.youtube.com/watch?v=pTi0MQbD7No)

[Github: Guide to use Jest with Lerna](https://github.com/facebook/jest/issues/3112)

[Github: TypeScript Project References Demo](https://github.com/RyanCavanaugh/project-references-demo)

[Github: Lerna + Project References](https://github.com/RyanCavanaugh/learn-a)
