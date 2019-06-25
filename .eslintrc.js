module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [2, 2, { SwitchCase: 1 }],
    'space-before-function-paren': ['error', 'always'],
    'react/jsx-first-prop-new-line': [1, 'always'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned']
  },
  parser: 'babel-eslint'
}
