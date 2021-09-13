module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/state-in-constructor': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [''],
      },
    ],
    'react/jsx-no-bind': [
      1,
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    'jsx-a11y/control-has-associated-label': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-debugger': 'off',
    'no-nested-ternary': 'off',
    'react/forbid-prop-types': 'warn',
  },
};
