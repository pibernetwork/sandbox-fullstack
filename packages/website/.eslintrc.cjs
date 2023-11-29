module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier',
    'custom',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
    project: true,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'svelte.config.js',
    'playwright.config.ts',
    'tailwing.config.js',
    'setupTest.ts',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    'func-style': 'off',
    'etc/throw-error': 'off',
    'no-inner-declarations': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['class', 'enum', 'interface', 'typeAlias', 'typeParameter'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: [
          'accessor',
          'classMethod',
          'classProperty',
          'function',
          'parameterProperty',
          'typeMethod',
          'typeProperty',
          // 'objectLiteralMethod', // check more in detail
          // 'objectLiteralProperty', this one cause errors with 0 index on objects.
        ],
        format: ['camelCase'],
      },
      {
        selector: ['enumMember'],
        format: ['UPPER_CASE'],
      },
      {
        selector: ['parameter'],
        format: ['camelCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      },

      {
        selector: ['variable'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: ['variable'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['variable', 'parameter'],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
  },
};
