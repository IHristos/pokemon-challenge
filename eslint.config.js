import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js, '@stylistic/js': stylisticJs },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'capitalized-comments': ['warn', 'always'],
      '@stylistic/js/indent': ['error', 2],
      'jsx-quotes': ['warn', 'prefer-single'],
    },
  },
]);
