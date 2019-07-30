module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [2, 2, { SwitchCase: 1 }],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'space-before-function-paren': ['error', 'always'],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react-hooks/exhaustive-deps': [0, 'never']
  },
  parser: 'babel-eslint'
}
