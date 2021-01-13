/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * We need to detect environment for ESLint CLI because there are rules
 * which are computationally expensive to perform during development: i.e.
 * when watching for changes and re-compile, we just want to run a light
 * set of lint rules. On the other hand, we want to run the full set during
 * production build; since IDE like `vscode` runs linting on a separate
 * process, we want to run the full set there too.
 *
 * NOTE: currently we are making use of a hack to identify IDE ESLint plugin
 * process: i.e. when `process.env.NODE_ENV = undefined`
 */
const enableFastMode =
  process.env.NODE_ENV === 'development' &&
  process.env.DEVELOPMENT_MODE !== 'advanced';

module.exports = {
  root: true, // tell ESLint to stop looking further up in directory tree to resolve for parent configs
  parserOptions: {
    // `parserOptions.project` is required for generating parser service to run specific rules like
    // `prefer-nullish-coalescing`, and `prefer-optional-chain`
    project: ['packages/*/tsconfig.json'],
    // Use this experimental flag to improve memory usage while using Typescript project reference
    // See https://github.com/typescript-eslint/typescript-eslint/issues/2094
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
  },
  plugins: ['@akphi/eslint-plugin'],
  extends: [
    'plugin:@akphi/eslint-plugin/recommended',
    !enableFastMode && 'plugin:@akphi/eslint-plugin/computationally-expensive',
    'plugin:@akphi/eslint-plugin/scripts-override', // must be called last to turn off rules which are not applicable for scripts
  ].filter(Boolean),
};
