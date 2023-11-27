module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['simple-import-sort', 'boundaries'],
  extends: ['custom'],

  ignorePatterns: [
    'build/',
    '.eslintrc.cjs',
    'codegen.ts',
    'src/resolvers-types.ts',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
