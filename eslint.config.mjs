// @ts-check
import eslint from '@eslint/js';
import * as importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'lint-staged.config.cjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: true
      }
    },
  },
  {
    rules: {
      // --- typescript-eslint rules ---
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "angle-bracket" }],
      "@typescript-eslint/naming-convention": [
        "error",
        { "selector": "default", "format": ["strictCamelCase"] },
        { "selector": "variable", "format": ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"] },
        // https://github.com/microsoft/TypeScript/issues/9458
        { "selector": "parameter", "modifiers": ["unused"], "format": ["strictCamelCase"], "leadingUnderscore": "allow" },
        { "selector": "property", "format": null },
        { "selector": "typeProperty", "format": null },
        { "selector": "typeLike", "format": ["StrictPascalCase"] },
        { "selector": "enumMember", "format": ["UPPER_CASE"] }
      ],
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/restrict-template-expressions": ["error", { "allowNumber": true }],
      // --- eslint rules ---
      'arrow-body-style': [
        'error',
        'as-needed',
        {
          'requireReturnForObjectLiteral': true
        }
      ],
      'semi': 'error',
      'no-console': 'error',
      'no-nested-ternary': 'error',
      'no-lonely-if': 'warn',
      'no-undefined': 'warn',
      'no-unexpected-multiline': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      // --- prettier rules ---
      'prettier/prettier': [
        'error',
        {
          'endOfLine': 'auto',
        }
      ],
      // --- import rules ---
      "import/named": "off",
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          },
          'pathGroups': [
            {
              'pattern': '@nestjs/**',
              'group': 'external',
              'position': 'before'
            }
          ]
        }
      ],
    },
  },
);