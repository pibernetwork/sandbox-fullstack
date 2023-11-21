/* eslint-disable boundaries/no-unknown-files */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      branches: 100,
      exclude: [
        '**/*types.ts',
        'src/types/index.ts',
        'src/*.ts',
        'codegen.ts',
        '.eslintrc.cjs',
        'api',
      ],
      functions: 100,
      lines: 100,
      provider: 'v8', // or 'v8'
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './build/coverage',
      statements: 100,
    },
    setupFiles: ['./setupTest.ts'],
  },
});
