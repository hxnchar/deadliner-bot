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
    'max-len': [
      'error',
      {
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
      },
    ],
    'class-methods-use-this': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
  },
};
