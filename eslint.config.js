import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Recommended Astro config
  ...eslintPluginAstro.configs.recommended,
  // JSX Accessibility recommended config
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'static-site/', '*.config.*', '.*rc.*'],
  },
];
