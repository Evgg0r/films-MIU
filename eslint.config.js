import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const {parser} = tseslint;
const tsRecommended = tseslint.configs.recommended;
const reactRules = react.configs.recommended.rules;
const a11yRules = jsxA11y.configs.recommended.rules;

export default tseslint.config(
    ...tsRecommended,

    {ignores: ['dist']},

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            parser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,

            import: importPlugin,
            'simple-import-sort': simpleImportSort,

            'jsx-a11y': jsxA11y,
            prettier: eslintPluginPrettier,
        },

        settings: {react: {version: 'detect'}},

        rules: {
            ...reactRules,
            'react/react-in-jsx-scope': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],

            ...a11yRules,

            'simple-import-sort/imports': ['error', {
                groups: [
                    ['^\\u0000'],

                    ['^react', '^@?\\w', '^type:@?\\w'],

                    ['^@', '^type:@'],

                    ['^\\.\\.(?!/?$)', '^\\.\\./$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./$'],
                ],
            }],
            'simple-import-sort/exports': 'error',

            'import/order': 'off',

            'prettier/prettier': 'error',
        },
    },

    prettierConfig,
);