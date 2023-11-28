import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // Eliminate in-source test code
    'import.meta.vitest': 'undefined',
  },
  plugins: [houdini(), sveltekit()],
  test: {
    coverage: {
      all: true,
      branches: 100,
      exclude: [
        '.svelte-kit',
        '**/*types.ts',
        'src/types/index.ts',
        'src/*.ts',
        'codegen.ts',
        '.eslintrc.cjs',
        'api',
        '.svelte-kit',
        '.prettierrc.mjs',
        'playwright.config.ts',
        'svelte.config.js',
        '$houdini',
        'houdini.config.js',
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
    setupFiles: ['setupTest.ts'],
  },
});
