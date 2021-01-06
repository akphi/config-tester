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

const OFF = 0;
const WARN = 1;
const ERROR = 2;

/**
 * Maintaining a large set of rules like might not be the best idea,
 * We would rather adopt some standard config like `eslint-config-airbnb`
 * or so but here we try to be consistent with `prettier` standard, especially
 * in terms of spacing. And since we want to eventually publish this rule set
 * as a preset, we want to maintain a set of rules that is in sync with `prettier`
 * to account for the case that the project uses this rule set does not use `prettier`
 */
const ES_RULES = {
  'array-bracket-spacing': [ERROR, 'never'],
  'arrow-body-style': [WARN, 'as-needed'],
  'array-callback-return': ERROR,
  'arrow-parens': WARN,
  'arrow-spacing': WARN,
  'block-spacing': [WARN, 'always'],
  'brace-style': [WARN, '1tbs', { allowSingleLine: true }],
  'comma-dangle': [ERROR, 'only-multiline'],
  'comma-spacing': [WARN, { before: false, after: true }],
  'comma-style': [ERROR, 'last'],
  'consistent-return': ERROR,
  'consistent-this': [ERROR, 'self'],
  'constructor-super': ERROR,
  curly: ERROR,
  'default-case': ERROR,
  'dot-location': [ERROR, 'property'],
  'dot-notation': [ERROR, { allowKeywords: true }],
  'eol-last': [WARN, 'always'],
  eqeqeq: ERROR,
  'func-call-spacing': ERROR,
  'guard-for-in': ERROR,
  'jsx-quotes': ERROR,
  'key-spacing': WARN,
  'keyword-spacing': [WARN, { before: true, after: true }],
  'no-console': WARN,
  'no-const-assign': ERROR,
  'no-debugger': WARN,
  'no-fallthrough': ERROR,
  'no-global-assign': ERROR,
  'no-invalid-regexp': ERROR,
  'no-irregular-whitespace': ERROR,
  'no-magic-numbers': [OFF, { ignore: [-1, 0, 1], enforceConst: true }],
  'no-mixed-spaces-and-tabs': ERROR,
  'no-multi-assign': WARN,
  'no-multi-spaces': WARN,
  'no-multiple-empty-lines': [WARN, { max: 1 }],
  'no-process-env': ERROR,
  'no-process-exit': ERROR,
  'no-proto': ERROR,
  'no-prototype-builtins': ERROR,
  'no-redeclare': ERROR,
  'no-regex-spaces': ERROR,
  'no-return-assign': ERROR,
  // This is a workaround as `import/no-relative-parent-imports` is not working properly with Typescript as of 2.20.1
  // See https://github.com/benmosher/eslint-plugin-import/issues/1644
  // See https://github.com/benmosher/eslint-plugin-import/issues/834
  // See https://github.com/benmosher/eslint-plugin-import/issues/669#issuecomment-316438608
  'no-restricted-imports': [WARN, { patterns: ['../*'] }],
  'no-trailing-spaces': WARN,
  'no-unused-labels': WARN,
  'no-unsafe-finally': ERROR,
  'no-unsafe-negation': WARN,
  'no-unreachable': ERROR,
  'no-var': ERROR,
  'no-void': ERROR,
  'no-whitespace-before-property': ERROR,
  'object-curly-spacing': [WARN, 'always'],
  'prefer-arrow-callback': ERROR,
  'prefer-const': WARN,
  'prefer-named-capture-group': WARN,
  'prefer-template': WARN,
  quotes: [WARN, 'single', { allowTemplateLiterals: true }],
  'require-yield': OFF,
  semi: [WARN, 'always', { omitLastInOneLineBlock: true }],
  'semi-spacing': [WARN, { after: true, before: false }],
  'semi-style': WARN,
  'space-before-blocks': WARN,
  'space-before-function-paren': [
    WARN,
    { anonymous: 'always', named: 'never' },
  ],
  'space-in-parens': [WARN, 'never'],
  'space-infix-ops': WARN,
  'space-unary-ops': WARN,
  strict: ERROR,
  'switch-colon-spacing': WARN,
  'template-curly-spacing': WARN,
  'template-tag-spacing': WARN,
};

const IMPORT_RULES = {
  'import/no-unresolved': OFF,
  'import/named': OFF,
  'import/namespace': OFF,
  'import/default': OFF,
  'import/export': OFF,
  'import/newline-after-import': [WARN, { count: 1 }],
  'import/no-default-export': WARN,
};

const TYPESCRIPT_RULES = {
  '@typescript-eslint/ban-types': [
    WARN,
    {
      // the default config disallows the use of 'object' and `Function` (which happen to be one of our element type) so we have to customize it
      // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
      types: {
        String: { message: `Use 'string' instead`, fixWith: 'string' },
        Boolean: { message: `Use 'boolean' instead`, fixWith: 'boolean' },
        Number: { message: `Use 'number' instead`, fixWith: 'number' },
        Symbol: { message: `Use 'symbol' instead`, fixWith: 'symbol' },
        Object: { message: `Use 'object' instead`, fixWith: 'object' },
      },
      extendDefaults: false,
    },
  ],
  '@typescript-eslint/camelcase': OFF,
  '@typescript-eslint/class-name-casing': OFF,
  '@typescript-eslint/consistent-type-imports': WARN,
  '@typescript-eslint/explicit-function-return-type': [
    WARN,
    { allowTypedFunctionExpressions: true },
  ],
  '@typescript-eslint/explicit-member-accessibility': OFF,
  '@typescript-eslint/no-inferrable-types': [WARN, { ignoreParameters: true }],
  '@typescript-eslint/no-var-requires': OFF,
  '@typescript-eslint/no-unused-vars': [
    WARN,
    { args: 'none', ignoreRestSiblings: true },
  ],
  '@typescript-eslint/no-extra-semi': WARN,
  '@typescript-eslint/no-implicit-any-catch': WARN,
  // NOTE: since functions are hoisted in ES6, it is then advisable to enable this rule so that we can have functions that depend on each other and not causing
  // circular module dependency. It is also said to be safe to use
  // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#options
  '@typescript-eslint/no-use-before-define': [ERROR, { functions: false }],
  '@typescript-eslint/no-useless-constructor': WARN,
  '@typescript-eslint/type-annotation-spacing': WARN,
  // NOTE: we turn off indentation rule as it clashes with `prettier`
  // and also, it could be computationally expensive
  // See https://github.com/eslint/eslint/issues/10930
  // See https://github.com/typescript-eslint/typescript-eslint/issues/372
  // See https://github.com/typescript-eslint/typescript-eslint/issues/1161
  //
  // However, if we need to enable this rule for some reason, the following option is the best
  // [OFF,2,
  //   {
  //     SwitchCase: 1,
  //     FunctionDeclaration: { parameters: 'first' },
  //     FunctionExpression: { parameters: 'first' },
  //     ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute'],
  //   },
  // ]
  '@typescript-eslint/indent': OFF,
};

const REACT_RULES = {
  'react-hooks/rules-of-hooks': ERROR,
  'react-hooks/exhaustive-deps': WARN,
  'react/jsx-boolean-value': [ERROR, 'always'],
  'react/jsx-fragments': [WARN, 'syntax'],
  'react/react-in-jsx-scope': OFF, // turn off as we use React@17 new JSX transform
  // using index as key often cause bug when we do form view so we have to be careful
  // NOTE: to handle this, we will use object UUID (UUID when we create an object) to make sure the key is unique
  'react/jsx-key': ERROR,
  'react/jsx-no-target-blank': ERROR,
  'react/no-array-index-key': WARN,
  'react/no-deprecated': ERROR,
  'react/no-direct-mutation-state': ERROR,
  'react/no-unescaped-entities': ERROR,
  // we use Typescript interface instead of `prop-types`
  'react/prop-types': OFF,
  // here are a few rules we follow to make `vscode` auto format work better with eslint
  'react/jsx-tag-spacing': [WARN, { beforeSelfClosing: 'always' }],
  'react/jsx-curly-spacing': [WARN, { when: 'never', allowMultiline: true }],
};

const EXPENSIVE__IMPORT_RULES = {
  // NOTE: this rule prevents using dependencies not listed in `package.json` but
  // currently, it's not working well with monorepo
  // See https://github.com/benmosher/eslint-plugin-import/pull/1696
  // 'import/no-extraneous-dependencies': [
  //   ERROR,
  //   {
  //     packageDir: [__dirname].concat(
  //       packages.map((packageName) => // const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));
  //         path.resolve(__dirname, `packages/${packageName}/`),
  //       ),
  //     ),
  //   },
  // ],
  // See https://github.com/benmosher/eslint-plugin-import/blob/master/config/warnings.js
  'import/no-named-as-default': ERROR,
  'import/no-named-as-default-member': ERROR,
  'import/no-duplicates': ERROR,
};

const EXPENSIVE__TYPESCRIPT_RULES = {
  // NOTE: following rules are classified as `type-aware` linting rule, which has huge initial performance impact on linting
  // They require parserServices to be generated so we have to specify 'parserOptions.project' property for @typescript-esint/parser
  '@typescript-eslint/prefer-nullish-coalescing': ERROR,
  '@typescript-eslint/prefer-optional-chain': ERROR,
  '@typescript-eslint/no-unnecessary-condition': ERROR,
  '@typescript-eslint/no-unnecessary-type-assertion': ERROR,
  '@typescript-eslint/no-throw-literal': ERROR,
  '@typescript-eslint/no-unsafe-assignment': ERROR,
  '@typescript-eslint/no-floating-promises': ERROR,
  '@typescript-eslint/no-misused-promises': ERROR,
};

/**
 * The following rules are computationally expensive and should be turned off during development for better DX
 * However, some of them enforces best practices we want to follow so we make them throw error
 * rather than warning during production build, and prompt developers to check before pushing code.
 *
 * There are a few major sources of performance hit for ESLint:
 * 1. Typescript type-ware check
 * 2. Import plugin
 * 3. Indentation rule
 * 4. Wide file scope (e.g. accidentally include `node_modules`)
 * See https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#my-linting-feels-really-slow
 */
const EXPENSIVE__RULES = {
  ...EXPENSIVE__IMPORT_RULES,
  ...EXPENSIVE__TYPESCRIPT_RULES,
};

module.exports = {
  root: true, // tell ESLint to stop looking further up in directory tree to resolve for parent configs
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    // `parserOptions.project` is required for generating parser service to run specific rules like
    // `prefer-nullish-coalescing`, and `prefer-optional-chain`
    project: ['packages/*/tsconfig.json'],
    // Use this experimental flag to improve memory usage while using Typescript project reference
    // See https://github.com/typescript-eslint/typescript-eslint/issues/2094
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
  },
  overrides: [
    {
      // relax linting rules for scripts
      files: ['**.js'],
      parser: 'babel-eslint', // use this parser for non-ts files so it does not require `parserOptions.project` config like `@typescript-eslint/parser`
      rules: {
        'no-console': OFF,
        'no-process-env': OFF,
        'no-process-exit': OFF,
        'import/no-default-export': OFF, // export default from script so we can use `require()` syntax
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-implicit-any-catch': OFF,
        ...Object.keys(EXPENSIVE__RULES).reduce((acc, val) => {
          acc[val] = OFF;
          return acc;
        }, {}),
      },
    },
  ],
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors', // See https://github.com/benmosher/eslint-plugin-import/blob/master/config/errors.js
    'plugin:import/typescript', // See https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
  ],
  rules: {
    ...ES_RULES,
    ...TYPESCRIPT_RULES,
    ...IMPORT_RULES,
    ...REACT_RULES,
    ...(enableFastMode ? {} : EXPENSIVE__RULES),
  },
};
