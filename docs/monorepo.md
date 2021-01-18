# Monorepo

This is not a "dissertation" on the concept of monorepo (mono-repo) nor a discussion thread on why we should or should not use monorepo. This is a technical record of how we transform our monolithic codebase (i.e. the whole codebase is one giant package) into a monorepo project. In the following sections, we will discuss our approach and implementation with regards to tooling and the development workflow in a monorepo project.

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

With this, we could start shaping our codebase in monorepo structure. The following section details the tooling support and setup.

### Monorepo Workspaces Manager: Yarn

We use [Yarn](https://yarnpkg.com/) as our monorepo manager. At the time of speaking, `lerna` is still a very popular choice, but `Yarn@2` has made a lot of `lerna` features redundant (e.g. [bootstraping](https://github.com/lerna/lerna/tree/main/commands/bootstrap), running scripts in parallel or [topological order](https://yarnpkg.com/cli/workspaces/foreach)).

> Yarn 2 has many niche features such as [Plug n Play](https://yarnpkg.com/features/pnp/#gatsby-focus-wrapper), but this currently [does not work well ESM](https://github.com/yarnpkg/berry/issues/638) so we will explore that option later.

### Module System: ECMAScript Module (ESM)

One problem that we have to deal with that does not happen for a monolithic codebase is to decide the type of Javascript modules we want to produce during `build` phase for each modules. The top level modules are consumed directly by the browser, and tools like `webpack` handles this well. Bundled code at the top level include source code from all dependencies, usually minified to optimize download speed (there are other techniques that we yet to consider such as [code-splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting) or [module-federation](https://webpack.js.org/concepts/module-federation/)). But when we build library modules, if we choose the same strategy for bundling code, we will end up with duplicated dependencies in the top level module bundle.

This is why we need to be able to do either the followings for library module bundle:

- Run [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) while bundling top-level module.
- While bundling library modules, mark some dependencies as external and force them to be specified as dependencies in the consumer/top-level modules.

The latter is supported by most bundlers like `webpack` or `rollup`. The former, however is not too straight-forward: to [fully support tree-shaking](https://webpack.js.org/guides/tree-shaking/), we need to bundle the library modules (i.e. non-top-level modules) as [ESM](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/), rather than [CommonJS (CJS)](https://auth0.com/blog/javascript-module-systems-showdown/). Unfortunately, the tooling support for ESM at the moment is not quite fully in place (e.g. at the time of speaking, `webpack@5` and `Jest@26` does not fully support ESM).

> Due to `Jest@26`'s [incomplete support for ESM](https://github.com/facebook/jest/issues/9430), we currently we still need to build an extra CJS bundle for each library module just for testing.

Then, not all dependencies support ESM (most have support for CJS as it's still the dominant one), and while some of them do, there are particular setup we have to follow to not wrongly pick the CJS bundle.

> Take `lodash` for example, to use ESM `lodash`, we have to use the library [lodash-es](https://www.npmjs.com/package/lodash-es). For big library like `monaco-editor`, tree-shaking also becomes vital, and their setup to use ESM is also [not straight-forward](https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97)

### Bundler: Webpack and Rollup

For modules with non-JS code, such as `HTML` or `Sass` - similar to `component-B` and `app-C` - the devtool operations require multiple steps. For `build` phase can be broken down into a series of steps, e.g. `build:typescript && build:sass && build:html && ...`. However, for `develop` phase, it implies we either have to:

- run `watch` processes in parallel: `<run-script-in-parallel> watch:typescript watch:sass ...`
- or, use tools like `webpack` or `gulp` to collate those tasks into one seemingly `atomic` operation, hence pipeline.

Ideally, the latter is the option we want choose to go with for both `build` and `develop`. We pick `webpack` because it is mature, highly customizable, and because it has a [rich and mature set of plugins](https://webpack.js.org/plugins/) for code processing as well as an out-of-the-box `watcher` with [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) support and [`dev-server`](https://webpack.js.org/configuration/dev-server/) which are extremely powerful for development.

> With `webpack`, bundling library as ESM [is currently not supported](https://github.com/webpack/webpack/issues/2933). Also, for `develop` phase, we would prefer `webpack` to not do bundle automatically, we had trouble setup a workflow where `app-C` module can depend on `component-B` that was built in dev mode. As such, we settle with the popular industrial solution - [`rollup`](https://rollupjs.org/guide/en/).

In terms of development workflow, for leaf modules like webapp `app-C`, when we rebuild modules that `app-C` depends on, `webpack-dev-server` should be able to pick up this change and either reload the app or `hot-replace` its module without refreshing the web page.

### Compiler/Transpiler: Typescript and Babel

There are 2 ways to process Typescript code:

- Using Typescript compiler [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html). `tsc` does type-checking and thus is able to create type declaration `*.d.ts` files. However, for project with codes other than Typescript, we cannot rely on `tsc` alone for `build` phase. Therefore, `tsc` is good only for library module like `lib-A`.
- Using `babel` plugin [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript). Note that `babel` [does not do type-checking](https://babeljs.io/docs/en/#type-annotations-flow-and-typescript). To a certain extent this is the desired behavior for `develop` phase since we can rebuild the project faster. Also, `babel` supports many plugins and [output runtime target](https://www.google.com/search?q=typescript+support+target+runtime&rlz=1C5CHFA_enUS781US781&oq=typescript+support+target+runtime&aqs=chrome..69i57j33i160.8648j0j1&sourceid=chrome&ie=UTF-8) which `tsc` doesn't.

As such, the [recommended](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html) [strategy](https://github.com/microsoft/TypeScript-Babel-Starter) is to use `tsc` only for library module, and for modules targeting the web or modules having non-JS code, we use `babel` for transpiling Typescript code to Javascript and use `tsc` only to type-check and build type declaration file.

Typescript has a niche feature that can be used to facilitate monorepo structure called [Project Reference](https://www.typescriptlang.org/docs/handbook/project-references.html). It manages the dependency graph between modules just like what `yarn` does but with caching specialized for the Typescript compiler [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

> A downside of using `project reference` is [tediousness](https://github.com/microsoft/TypeScript/issues/25376), we need to specify all projects (modules) on top level `tsconfig` and all referenced projects in the module `tsconfig`, hence duplicating declaration of dependencies in `package.json`. See [example](https://github.com/RyanCavanaugh/learn-a).

In the `build` phase, `tsc` will be used to create type declaration `*.d.ts`. Since `tsc` [does not support target runtime](https://github.com/microsoft/TypeScript/issues/19183) (i.e. browser polyfill), we would use `tsc` to build only library modules - similar to `lib-A`. For `develop` phase, we can run `tsc -b -w` at root as a separate terminal process for type-checking.

`babel` will be used `webpack` for both `develop` and `build` for modules similar to `component-B` and `app-C`.

### Version Manager and Publisher: Yarn

[lerna](https://github.com/lerna/lerna) does a great job at managing version, it also helps with [generating changelogs using conventional commit](https://github.com/lerna/lerna/tree/main/commands/version#--conventional-commits). However, as mentioned, most of its feature set are already covered by Yarn, so we decide to use Yarn instead as our version manager and publisher.

We use [changesets](https://github.com/atlassian/changesets) for versioning and documenting changes (creating changelogs) and `Yarn` for publishing. `changesets` is still a pretty _young_ project and requires more work to [integrate better](https://github.com/atlassian/changesets/issues/432) with `Yarn@2`. What we really like about `changesets` is its [fresh take on monorepo release process](https://github.com/atlassian/changesets/blob/master/docs/detailed-explanation.md), such as how it creates separate `CHANGELOG.md` files and release tags for each package. `Yarn@2` is also considering to [unify its releasing workflow](https://github.com/yarnpkg/berry/issues/1510) with that of `changesets`, so we might only need `Yarn` in the future.

### IDE: Visual Studio Code

We use [Visual Studio Code (vscode)](https://code.visualstudio.com/). `vscode` seems to naturally support monorepo, the only thing we need to do is to ensure running `yarn install` so modules are linked properly, `Go to definition (Ctrl + Click)` should work nicely without any other config.

> The most important setup for VSCode to work is for Typescript. If we use project reference, we don't seem to need `paths` to be able to have auto-imports work properly in VSCode. However, we must go to auto-imports setting and change it to `on` instead of `auto` as this might hide away imports from our monorepo modules.<br/><br/>An example of this is when you have a module `@something/a` that depends on`@something/b`. `@something/b` exports a function called `helloworld()`. While working in `@something/a`, we type `hellow` at this point, `helloworld` should have been suggested but it doesn't. However, when we manually import `helloworld` by specifying `import { helloworld } from '@something/b'` it works just fine, which means our setup is correct. At this point, forcing `auto-imports` to be `on` in VSCode settings solves the issue

## References

- [Developing in a Large Monorepo - Jai Santhosh - JSConf Korea](https://www.youtube.com/watch?v=pTi0MQbD7No)
- [Github: Guide to use Jest with Lerna](https://github.com/facebook/jest/issues/3112)
- [Github: TypeScript Project References Demo](https://github.com/RyanCavanaugh/project-references-demo)
- [Github: Lerna + Project References](https://github.com/RyanCavanaugh/learn-a)

## Previous Discussions

- [Dan Luu: Monorepo](http://danluu.com/monorepo/)
- [Gregory Szorc: On Monolithic Repositories](https://gregoryszorc.com/blog/2014/09/09/on-monolithic-repositories/)
- [Facebook Engineering: Scaling Mecurial at Facebook](https://engineering.fb.com/2014/01/07/core-data/scaling-mercurial-at-facebook/)
- [Youtube: F8 2015 - Big Code: Developer Infrastructure at Facebook's Scale](https://www.youtube.com/watch?v=X0VH78ye4yY&ab_channel=FacebookDevelopers)