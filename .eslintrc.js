const path = require('path');

const OFF = 0;
const WARN = 1;
const ERROR = 2;

const ES_RULES = {
  // 'quotes': [WARN, 'single', { allowTemplateLiterals: true }],
};

const ESLINT_IMPORT_RULES = {
  'import/named': OFF,
  'import/no-unresolved': OFF,
  'import/no-default-export': WARN,
  'import/no-extraneous-dependencies': WARN,
  'import/no-relative-parent-imports': WARN,
};

const TYPESCRIPT_RULES = {
  '@typescript-eslint/camelcase': OFF,
};

const REACT_RULES = {
  'react/prop-types': OFF,
};

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json")
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true,
    jest: true,
  },

  plugins: [
    "react",
    "react-hooks"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: { ...ES_RULES, ...TYPESCRIPT_RULES, ...ESLINT_IMPORT_RULES, ...REACT_RULES},
};
