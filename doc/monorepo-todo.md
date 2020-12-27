# TODO

- Try to publish something to `NPM` and consume it back somewhere else, try a dummy utility function????

- Upgrade to `webpack-dev-server@4.beta.1`
- Upgrade to `@pmmmwh/react-refresh-webpack-plugin@0.5.0-beta.0`

# Bundle size issues

- check `react-icons` bundling shenanigan
  https://github.com/patternfly/patternfly-react/issues/3268
  https://github.com/react-icons/react-icons/issues/154
- add `externals: [monaco-editor, react, react-dom, material-ui]` to webpack
- Try to have `monaco` in `component1` and `app1` to see if it gets duplicated:
  - do experiment with https://github.com/microsoft/monaco-editor-webpack-plugin/issues/97
  - then try to create a file that `export *` and re-measure bundlesize
  - otherwise, TRY create our own module to load `monaco-editor`
    https://webpack.js.org/guides/code-splitting/

# Webpack ESM

- Use `module` instead of `main` in `package.json`
  https://webpack.js.org/guides/author-libraries/#final-steps
  https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage
- We want to use ESM when bundling from Webpack so consumer can do tree-shaking. This is on Webpack roadmap
  https://github.com/webpack/webpack/issues/2933
- The alternative like `rollup` and `parcel` don't have rich enough plugin support for `react` `fast-refresh` or `HotModuleReplacement` or loading `monaco-editor`
- Check if we need to force `babel-preset-env` to export to the right kind of module with `modules` flag
  https://stackoverflow.com/questions/55792519/what-does-the-modulesauto-means-in-babel-preset-env-field
  https://babeljs.io/docs/en/babel-preset-env#modules
- Check out webpack guide to tree-shaking:
  https://webpack.js.org/guides/tree-shaking/
- Need to add `sideEffects: false` to `package.json`
  https://stackoverflow.com/questions/49160752/what-does-webpack-4-expect-from-a-package-with-sideeffects-false
- Explicitly tell `babel-jest` to export CommonJS as Jest does not currently support ESM. Check
  https://github.com/facebook/jest/issues/9430
  https://jestjs.io/docs/en/next/configuration#extensionstotreatasesm-arraystring
  https://medium.com/@craigmiller160/how-to-fully-optimize-webpack-4-tree-shaking-405e1c76038
