module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'], // activate vue related rules
  plugins: ['vue'],
  rules: {
    'quotes': ['error', 'single'],
    'code': ['warning', 100],
    'semi': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [2, 2, { SwitchCase: 1}],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    'space-before-function-paren': ['error', 'always']
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  'overrides': [{
    'files': ['*.vue'],
    'rules': {
      'indent': 'off'
    }
  }]
}
