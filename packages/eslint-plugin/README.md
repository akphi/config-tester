# @akphi/eslint-plugin

This plugin includes 3 configs:

- `recommended`: This config turns on rules in recommended configs for `ESLint`, `eslint-plugin-import`, `React`, `Prettier`, and `Typescript`. These rules are light-weighted, and suitable to run on incremental build during development.
- `computationally-expensive`: This config turns on [computationally expensive](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#my-linting-feels-really-slow) rules. For example: Typescript type-ware checks, import rules that require checking multiple files, indentation rules, etc. These rules are not suitable to run on incremental build as they seriously increase effective rebuild time.
- `scripts-override`: This config turns off certain rules which are not suitable for script files or Javascript files (i.e. Typescript-specific rules). As such, this config if used in tandem with other configs, should go last.

Following is an example of usage:

```js
module.exports = {
  root: true, // tell ESLint to stop looking further up in directory tree to resolve for parent configs
  parserOptions: {
    // `parserOptions.project` is required for generating parser service to run specific Typescript rules
    project: ['packages/*/tsconfig.json'],
  },
  plugins: ['@akphi/eslint-plugin'],
  extends: [
    'plugin:@akphi/eslint-plugin/recommended',
    'plugin:@akphi/eslint-plugin/computationally-expensive',
    'plugin:@akphi/eslint-plugin/scripts-override',
  ].filter(Boolean),
};
```
