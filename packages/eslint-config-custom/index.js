module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
    'plugin:etc/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended',
    'plugin:vitest/recommended',
    'plugin:boundaries/strict',
    'plugin:perfectionist/recommended-alphabetical',
  ],
  rules: {
    // Boundaries
    'boundaries/no-unknown-files': 'off',
    // Still do not make sense with my current knowledge.
    'boundaries/no-private': 'off',

    // Naming conventions
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
        format: ['camelCase', 'UPPER_CASE'],
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
    // perfecionist
    'perfectionist/sort-imports': ['off'],
    // perfecionist
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'start', 'end', 'unknown'],
        'custom-groups': {
          id: 'id',
          start: 'start',
          end: 'end',
        },
      },
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'index-signature',
          'static-property',
          'private-property',
          'property',
          'constructor',
          'static-method',
          'method',
          'private-method',
        ],
      },
    ],

    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          args: false,
        },
      },
    ],

    // prettier
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    // vitest
    'vitest/consistent-test-filename': 'error',
    'vitest/no-alias-methods': 'error',
    'vitest/no-standalone-expect': 'error',
    'vitest/prefer-mock-promise-shorthand': 'error',

    // security
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-regexp': 'off',
    'security/detect-non-literal-fs-filename': 'off',

    // etc
    'etc/no-commented-out-code': 'error',
    'etc/throw-error': 'error',
    'etc/prefer-less-than': 'error',
    // 'etc/no-enum': 'error',

    // disabled because of etc/prefer-less-than
    'unicorn/explicit-length-check': 'off',
    // I personally dislike this at first glance
    'unicorn/numeric-separators-style': 'off',

    // typescript
    // Limitation of using vitest-mock-extended
    '@typescript-eslint/unbound-method': 'off',
    // Limitations of using commanderjs
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-extraneous-class': 'error',

    // native eslint
    'max-depth': ['error', 3],
    'no-console': ['warn', { allow: ['error'] }],
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-duplicate-imports': 'error',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    complexity: ['error', 5],
    'func-style': ['error', 'declaration'],
    'max-lines': ['error', 300],
    'max-lines-per-function': ['error', 250],
    'max-nested-callbacks': ['error', 5],
    'max-params': ['error', 7],
    'max-statements': ['error', 70],
    'max-statements-per-line': ['error', { max: 1 }],
  },
};
