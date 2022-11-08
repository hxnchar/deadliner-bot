module.exports = {
  'env': {
    'amd': true,
    'node': true,
    'es2021': true,
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['sonarjs', '@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    'metarhia',
    'plugin:sonarjs/recommended',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts'],
      },
    },
  },
  'rules': {
  },
};
