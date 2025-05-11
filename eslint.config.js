// eslint.config.js   (ESM-файл: .js с "type": "module" в package.json, либо .mjs)
import 'eslint-plugin-only-warn';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  /* 0. игнорируем артефакты сборки */
  { ignores: ['dist/**', 'build/**', '*.config.js'] },

  /* 1. базовый конфиг **сразу** задаёт parser + project */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // путь до вашего tsconfig (можно массив путей, если монорепо)
        project: ['./tsconfig.eslint.json'],
        // важно для запуска из подпапок / IDE
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: { react: { version: 'detect' } },
  },

  /* 2. далее — готовые пресеты */
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,

  /* 3. ваши точечные правила */
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
    },
  },

  /* 4. и последним — Prettier */
  prettierRecommended
);
