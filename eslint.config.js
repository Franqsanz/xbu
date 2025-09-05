import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['cypress/*']),
  {
    extends: fixupConfigRules(
      compat.extends(
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        // "plugin:cypress/recommended",
        'prettier',
        'standard',
      ),
    ),
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
      // cypress: fixupPluginRules(cypress),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // ...cypress.environments.globals.globals,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': 1,
      semi: 0,
      'no-unused-vars': 1,
      quotes: 0,
      'space-before-function-paren': 0,
      'comma-dangle': 0,
      'multiline-ternary': 0,
      // indent: [2, 2],
      'import/no-absolute-path': 0,
      'no-array-constructor': 0,
      'no-unused-expressions': 0,
      'prefer-const': 0,
      'func-style': [
        1,
        'declaration',
        {
          allowArrowFunctions: false,
        },
      ],
      'n/handle-callback-err': 0,
      camelcase: 0,
      'prettier/prettier': [
        2,
        {
          trailingComma: 'all',
          tabWidth: 2,
          singleQuote: true,
          printWidth: 85,
          jsxSingleQuote: true,
          bracketSameLine: false,
          endOfLine: 'auto',
        },
      ],
      indent: 'off',
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/adjacent-overload-signatures': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/no-namespace': 0,
      'react/no-unescaped-entities': 0,
      'react-hooks/exhaustive-deps': 0,
      'react/react-in-jsx-scope': 0,
    },
  },
]);
