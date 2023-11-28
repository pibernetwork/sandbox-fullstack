/** @type { import("eslint").Linter.FlatConfig } */
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
};
