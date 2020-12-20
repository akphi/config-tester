# Monorepo TODO

- Try to publish something to NPM maybe
- Look at babel config from emotion project with cache and filename test overrides, create our own babel module
- Create a developer.md file to describe the development experience the java module like flow and the flow where you use multiple terminal tabs
- Create script to create a new app module
- Create script to create a new plugin module
- Note: seems like eslint should work out of the box https://github.com/typescript-eslint/typescript-eslint/issues/2094
- Write a philosophy guide and then the steps:
  https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/

# Separate actions

- Install
- Bootstrap??? Document this step what it does??? Maybe we dont need it due to yarn
- Clean
- Build
- Dev/watch (tsc, babel, webpack, react-refresh, sass — how do we parallelize this?) - no watch global anymore - just expect people to go and rebuild all - just like Java module - have webpack for each?!!!!!!!!!!!!!!!!
- Test
- Lint
- Code formatter (can be run as part of pre commit hook)
- Versioning
- Publish/release/link

# TODO

- `try` setup `lerna dev` to run in parallel
- create `babel.config.js`, use it with webpack (setup proper file extension override)
- setup ESLint
- setup Jest
- setup Jest watch?

# Babel

- We probably should have `babel.config.js` on top level and use `rootMode: 'upward'` for `babel-loader` in `webpack`
- Tidy up babel config using `env` and `overrides` or `process.env.NODE_ENV` - `*.js` files only need `preset-env`, `*.ts` files don't need `react` preset, `*.tsx` files need all - https://stackoverflow.com/questions/52129579/how-to-properly-override-babel7-plugins-for-separate-webpack-server-client-conf - https://babeljs.io/docs/en/options#overrides
- `TODO` Turn on React JSX `automatic` - Check the implication this has with typescript
  https://www.typescriptlang.org/docs/handbook/jsx.html###

# Test

- Write doc for testing strategy, highlight the following points:
  - Unit test is for truly unit stuffs, utilities, etc.
  - Integration test is Studio alone, isolated from backends, we should mock network calls
  - Cypress/E2E test is for interacting with the whole stack and be able to play/see the result -> good for demoing in a sense
  - `TODO` Mock server request instead of engine method, maybe this is the better way to write test?
    https://kentcdodds.com/blog/stop-mocking-fetch?ck_subscriber_id=564011516
    https://github.com/mswjs/msw

# Legend Studio

- change generating of `config.json` to points at `legend.finos.` by default, clearly that way
- Handle creation of `version.json`, skip maven?
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Check with @maoo to enable `Renovate` bot for Studio - https://github.com/apps/renovate
- Learn from babel github-actions script to respond to issue on github
- Create a script to check typescript tsconfig file references using `package.json`, we shouldn't update since the `tsconfig.json` file might contain comments
- Follow commit message format in vue.js
- Consider add section in `CONTRIBUTING.md` on commit message format
  https://github.com/torvalds/subsurface-for-dirk/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88
- Add `copyrightchecker` script like `Jest`
- Consider tidying up the `paths` of `tsconfig.json` using - `tsconfig-paths` and `tsconfig-paths-webpack-plugin` - https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
- Consider using conventional-commits
  https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary
  https://github.com/conventional-changelog/conventional-changelog
  https://github.com/facebook/docusaurus/blob/master/CONTRIBUTING.md#semantic-commit-messages
- Consider using `prettier` - use // prettier-ignore if needs be - now we can probably remove the auto-format after-save in `.vscode/settings` - consider `eslint-plugin-prettier`
- setup `husky` pre-commit hook with `prettier` like `github/babel`

# Further Improvements

- Stylelint
  https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter OR https://medium.com/@serhiihavrylenko/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f
  https://stylelint.io/developer-guide/formatters#writing-formatters
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
