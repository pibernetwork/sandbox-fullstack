import prettierConfig from 'prettier-config';

export default {
  ...prettierConfig,
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
  plugins: ['prettier-plugin-svelte'],
};
