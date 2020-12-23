# TODO

- complete `Babel` config (see next section)
- Try with `ts-fork-checker....`
- Move webpack into `dev-scripts`, use it in 2 modules: `app1` and `component1`

- Try to publish something to `NPM` and consume it back somewhere else, inside GS, try a dummy utility function????
- Upgrade to `webpack-dev-server@4.beta.1`

# Babel

- create `babel.config.js`, use it with webpack (setup proper file extension override)
- We probably should have `babel.config.js` on top level and use `rootMode: 'upward'` for `babel-loader` in `webpack`
- Tidy up babel config using `env` and `overrides` or `process.env.NODE_ENV` - `*.js` files only need `preset-env`, `*.ts` files don't need `react` preset, `*.tsx` files need all - https://stackoverflow.com/questions/52129579/how-to-properly-override-babel7-plugins-for-separate-webpack-server-client-conf - https://babeljs.io/docs/en/options#overrides
- Look at babel config from emotion project with cache and filename test overrides, create our own babel module

# Monaco Editor and Webpack

- Try to have `monaco` in `component1` and `app1` to see if it gets duplicated:
  - do experiment with https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97
  - then try to create a file that `export *` and re-measure bundlesize
  - otherwise, TRY create our own module to load `monaco-editor`
    https://webpack.js.org/guides/code-splitting/
