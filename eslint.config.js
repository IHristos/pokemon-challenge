import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended', eslintConfigPrettier],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'capitalized-comments': ['warn', 'always'],
      'no-unused-vars': 'warn',
      'no-duplicate-imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/order': ['error', { alphabetize: { order: 'asc' } }],
      eqeqeq: ['error', 'always'],
    },
  },
]);
