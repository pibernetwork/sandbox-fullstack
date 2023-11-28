import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    // Eliminate in-source test code
    'import.meta.vitest': 'undefined',
  },
  plugins: [sveltekit()],
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
        '.svelte-kit',
        'build',
        '.prettierrc.mjs',
        'playwright.config.ts',
        'svelte.config.js',
      ],
      functions: 100,
      lines: 100,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './build/coverage',
      statements: 100,
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./setupTest.ts'],
  },
});
