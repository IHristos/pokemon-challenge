import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      'unused-imports': pluginUnusedImports,
      import: pluginImport,
    },
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
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
