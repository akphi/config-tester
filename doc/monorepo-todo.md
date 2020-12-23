# TODO

- add comment for `prietter.rc` explaining about philosophy, limitation and printWidth

- complete `Babel` config (see next section)

- Use `webpack-dev-server@4` anyway
- Try with `ts-fork-checker....`
- Move webpack into `dev-scripts`

- Try to publish something to `NPM` and consume it back somewhere else, inside GS, try a dummy utility function????

# Babel

- create `babel.config.js`, use it with webpack (setup proper file extension override)
- We probably should have `babel.config.js` on top level and use `rootMode: 'upward'` for `babel-loader` in `webpack`
- Tidy up babel config using `env` and `overrides` or `process.env.NODE_ENV` - `*.js` files only need `preset-env`, `*.ts` files don't need `react` preset, `*.tsx` files need all - https://stackoverflow.com/questions/52129579/how-to-properly-override-babel7-plugins-for-separate-webpack-server-client-conf - https://babeljs.io/docs/en/options#overrides
- Look at babel config from emotion project with cache and filename test overrides, create our own babel module

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
