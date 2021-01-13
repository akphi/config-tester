/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const COMPUTATIONALLY_EXPENSIVE_RULES = require('./computationally-expensive')
  .rules;

const OFF = 0;

const config = {
  overrides: [
    {
      // relax linting rules for scripts
      files: ['**.js'],
      parser: '@babel/eslint-parser', // use this parser for non-ts files so it does not require `parserOptions.project` config like `@typescript-eslint/parser`
      rules: {
        'no-console': OFF,
        'no-process-env': OFF,
        'no-process-exit': OFF,
        'import/no-default-export': OFF, // export default from script so we can use `require()` syntax
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-implicit-any-catch': OFF,
        ...Object.keys(COMPUTATIONALLY_EXPENSIVE_RULES).reduce((acc, val) => {
          acc[val] = OFF;
          return acc;
        }, {}),
      },
    },
  ],
};

module.exports = {
  config,
};
