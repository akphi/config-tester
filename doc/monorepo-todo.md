# Monorepo TODO

- Try to publish something to NPM maybe
- Look at babel config from emotion project with cache and filename test overrides, create our own babel module
- Create a developer.md file to describe the development experience the java module like flow and the flow where you use multiple terminal tabs
- Create script to create a new app module
- Create script to create a new plugin module
- Note: seems like eslint should work out of the box https://github.com/typescript-eslint/typescript-eslint/issues/2094
- Write a philosophy guide and then the steps:
  https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/

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
