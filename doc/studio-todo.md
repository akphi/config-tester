## TODO Legend Studio

- Consider tidying up the `paths` of `tsconfig.json` using - `tsconfig-paths` and `tsconfig-paths-webpack-plugin` - https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
- change generating of `config.json` to points at `legend.finos.` by default, clearly that way
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) for `cypress` e2e test - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Check with @maoo to enable `Renovate` bot for Studio - https://github.com/apps/renovate
- Learn from `babel` `github-actions` script to respond to issue on github
- Create an `npx` program to create a site that uses legend studio - see `docusaurus` and `create-react-app` for inspiration. Use `cli` to do so - https://dev.to/iulianoctavianpreda/run-your-npx-script-directly-from-github-create-your-own-cli-commands-and-other-stories-4pn3

# License

- check if we can shorten the copyright message to point at the copyright file at the root of the module

```
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
```

# Further Improvements

- Yarn 2 with `PNP`, or NPM 7
- Code-splitting and lazy-loading
  https://github.com/dan-kez/lerna-webpack-example
  https://github.com/jamiebuilds/react-loadable
  https://webpack.js.org/guides/lazy-loading/
  https://reactrouter.com/web/guides/code-splitting
  https://loadable-components.com/
  https://loadable-components.com/docs/loadable-vs-react-lazy/