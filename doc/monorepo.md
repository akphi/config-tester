# VSCode

- NOTE: if we setup properly using project reference, we don't seem to need `paths` to be able to have auto-imports work properly in VSCode. However, we must go to auto-imports setting and change it to `on` instead of `auto` as this might hide away imports from our monorepo modules. An example of this is when you have a module `@something/a` that depends on`@something/b`. `@something/b` exports a function called `helloworld()`. While working in `@something/a`, we type `hellow` at this point, `helloworld` should have been suggested but it doesn't. However, when we manually import `helloworld` by specifying `import { helloworld } from '@something/b'` it works just fine, which means our setup is correct. At this point, forcing `auto-imports` to be `on` in VSCode settings solves the issue

## DEV

- `webpack-dev-server` has to watch for changes on other modules
- `OPTIONAL` `sass` has to watch for changes and recompile sass files and have the `root` repo pickup this change
- `OPTIONAL` `fork-ts-checker-webpack-plugin`
- `OPTIONAL` `react-refresh` --> this means we are forced to use `babel` instead of `tsc` for modules with
- NOTE: for IDE, we need proper `tsconfig` anyway

## PROD

- if we target browser -> we use `babel` since it supports runtime and `browserlist` - we might just need `tsc` for all other modules
- NOTE: might not need `fork-ts-checker-webpack-plugin`
- `OPTIONAL` `rollup` or `webpack` if we need to bundle

# Lerna, Yarn workspaces

- Monorepo 101
  https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
  https://www.youtube.com/watch?v=pTi0MQbD7No&ab_channel=JSConf
- Philosophy:
  - `app` vs `lib` - https://www.reddit.com/r/typescript/comments/dl8efz/monorepos_with_typescript/f4qc1my/

# Typescript

- set `outDir = build`
- add a cleanup script - `"clean": "rm -rf dist *.tsbuildinfo"`
- `MAYBE` we need to set `paths` in `tsconfig` to resolve the `src` (check this again because it seems like `Jest` does not need it)
  https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559

- Use project reference? `composite: true` for referenced project and `tsc --build/-b` for top-level project
  https://www.reddit.com/r/typescript/comments/dl8efz/monorepos_with_typescript/
  https://betterstack.dev/blog/lerna-typescript-monorepo/#heading-install-lerna (very detailed guide)
  https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0

- `babel` vs `tsc` - basically: use `babel` for transpiling into JS and `tsc` for type-checking
  https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html
  https://github.com/microsoft/TypeScript-Babel-Starter

- Follow the thinking of this
  https://github.com/RyanCavanaugh/learn-a
  https://github.com/microsoft/TypeScript-Babel-Starter

- Typescript project reference, divide the project into multiple modules with hierarychy of build
  https://www.typescriptlang.org/docs/handbook/project-references.html

# Babel

- we may only need `babel` for endpoint module - "I use plain old tsc if I'm writing something that won't touch the browser. If I'm using webpack anywhere, I use babel instead." - https://www.reddit.com/r/typescript/comments/afpjxj/tsc_vs_using_babel7_with_ts_plugin/ - https://www.reddit.com/r/typescript/comments/dyvpp2/typescript_compiler_or_babel/
- babel??? - https://medium.com/@serhiihavrylenko/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f

- We probably should have `babel.config.js` on top level and use `rootMode: 'upward'` for `babel-loader` in `webpack`
- Tidy up babel config using `env` and `overrides` or `process.env.NODE_ENV` - `*.js` files only need `preset-env`, `*.ts` files don't need `react` preset, `*.tsx` files need all - https://stackoverflow.com/questions/52129579/how-to-properly-override-babel7-plugins-for-separate-webpack-server-client-conf - https://babeljs.io/docs/en/options#overrides
- `TODO` Turn on React JSX `automatic` - Check the implication this has with typescript
  https://www.typescriptlang.org/docs/handbook/jsx.html

# Webpack

- Checkout webpack `mainFields` - https://www.reddit.com/r/typescript/comments/dl8efz/monorepos_with_typescript/f4qc1my/ - https://webpack.js.org/configuration/resolve/#resolvemainfields
- If all else fails, consider looking at running `webpack-dev-server` in parallel - https://stackoverflow.com/questions/46444931/how-to-use-webpack-dev-server-with-multiple-webpack-configs or having a single `webpack.config.js` in the root folder (probably not) - https://stackoverflow.com/questions/46767844/how-to-properly-use-lerna-and-webpack-when-dealing-with-a-monorepo
- Also if all fails, try to go through the `prepare` script route - https://stackoverflow.com/questions/46698155/watch-for-changes-in-an-npm-link-package-being-built-with-webpack
- huh? - https://stackoverflow.com/questions/61553119/use-webpack-hmr-with-a-hoisted-lerna-react-project

# CSS/SASS

- ??? emotion inject global style?
  https://emotion.sh/docs/globals

- Check this out we might need to run this in parallel with `tsc`
  https://medium.com/@dandobusiness/adding-sass-scss-to-your-react-typescript-project-162de415b19a

```bash
# http://sassbreak.com/watch-your-sass/
sass --watch
```

- Consider `cpx` like `codesandbox-client`: copy files but with watch - https://www.npmjs.com/package/cpx

# package.json

- Use `peerDependencies` - study from other repos: react, jest, babel
  https://github.com/stereobooster/typescript-monorepo

# Script

- lerna --parallel
- package: npm-run-all
- package: concurrently

# Jest

- Guide to run Jest in monorepo - https://github.com/facebook/jest/issues/3112
- Write doc for testing strategy, highlight the following points:
  - Unit test is for truly unit stuffs, utilities, etc.
  - Integration test is Studio alone, isolated from backends, we should mock network calls
  - Cypress/E2E test is for interacting with the whole stack and be able to play/see the result -> good for demoing in a sense
  - `TODO` Mock server request instead of engine method, maybe this is the better way to write test?
    https://kentcdodds.com/blog/stop-mocking-fetch?ck_subscriber_id=564011516
    https://github.com/mswjs/msw

# ESLint / Stylelint

...

# Studio

- Add `copyrightchecker` script like `Jest`
- Handle creation of `version.json`, skip maven?
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Check with Mao to enable `Renovate` bot for Studio - https://github.com/apps/renovate

# Afterall

- Consider using `prettier` - use // prettier-ignore if needs be - now we can probably remove the auto-format after-save in `.vscode/settings` - consider `eslint-plugin-prettier`
- setup `husky` pre-commit hook with `prettier` like `babel`
- Consider tidying up the `paths` of `tsconfig.json` using - `tsconfig-paths` and `tsconfig-paths-webpack-plugin` - https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
- Stylelint? - https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter OR https://medium.com/@serhiihavrylenko/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f
- Yarn 2 with `PNP`, or NPM 7
- Code-splitting and lazy-loading - https://github.com/dan-kez/lerna-webpack-example
- Consider using `rollup` for bundling libs, we will use `webpack` for apps and development

# Example

- Checkout `codesandbox-client/common/package.json`

```json
"scripts": {
    "build": "yarn build:lib",
    "build:dev": "yarn build",
    "build:lib": "yarn clean && yarn tsc && yarn babel src --out-dir lib && yarn cpx \"src/**/*.{css,svg,png,jpg,woff,woff2,d.ts}\" lib",
    "build:storybook": "build-storybook -c .storybook -o public",
    "clean": "rimraf lib && yarn rimraf node_modules/@types/react-native",
    "lint": "eslint --ext .js,.ts,.tsx src",
    "prepublish": "yarn build",
    "start": "(yarn tsc --watch & yarn babel src --out-dir lib --watch & yarn cpx \"src/**/*.{css,svg,png,jpg,woff,woff2}\" lib --watch)",
    "start:storybook": "start-storybook",
    "test": "cross-env NODE_ENV=test jest --maxWorkers 2",
    "typecheck": "tsc --noEmit"
  },
```
