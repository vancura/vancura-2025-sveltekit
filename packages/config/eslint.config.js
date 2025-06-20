import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

const TSCONFIG_PATH = './tsconfig.json';

export default [
    {
        ignores: [
            '.env*',
            '.pnp.*',
            '**/.svelte-kit/**',
            '**/.vercel/**',
            '**/*.md',
            '**/*.mdx',
            '**/*.min.js',
            '**/build/**',
            '**/coverage/**',
            '**/dist/**',
            '**/node_modules/**',
            '**/storybook-static/**',
            'package-lock.json',
            'vite.config.ts.timestamp-*',
        ],
    },
    {
        files: ['**/*.ts', '**/*.svelte'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: TSCONFIG_PATH,
                extraFileExtensions: ['.svelte'],
            },
            globals: {
                console: true,
                process: true,
                Buffer: true,
                __dirname: true,
                __filename: true,
                global: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
            jsdoc: jsdocPlugin,
            n: nodePlugin,
            perfectionist: perfectionistPlugin,
            promise: promisePlugin,
            security: securityPlugin,
            sonarjs: sonarjsPlugin,
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.ts', '.mjs', '.svelte'],
                },
                typescript: {
                    alwaysTryTypes: true,
                    project: TSCONFIG_PATH,
                },
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mjs'],
            },
        },
        rules: {
            // Base ESLint rules
            ...eslint.configs.recommended.rules,
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-unused-vars': 'off', // TypeScript handles this

            // TypeScript rules (moderate strictness)
            ...tseslint.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: false,
                    },
                },
            ],

            // Import rules
            'import/no-unresolved': 'off', // TypeScript handles this
            'import/prefer-default-export': 'off',

            // Perfectionist - sort imports
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'natural',
                    order: 'asc',
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
                    customGroups: {
                        value: {
                            builtin: ['node:*'],
                            internal: ['^\\$lib/.*', '^\\$content/.*', '^\\$app/.*'],
                        },
                    },
                    newlinesBetween: 'always',
                    internalPattern: ['^\\$.*'],
                },
            ],

            // JSDoc rules
            'jsdoc/check-alignment': 'warn',
            'jsdoc/check-param-names': 'warn',
            'jsdoc/check-tag-names': 'warn',
            'jsdoc/require-jsdoc': [
                'warn',
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                    },
                    contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'],
                },
            ],
            'jsdoc/require-param': 'warn',
            'jsdoc/require-returns': 'warn',
            'jsdoc/require-description': 'warn',

            // Code quality rules
            ...sonarjsPlugin.configs.recommended.rules,
            'sonarjs/cognitive-complexity': ['error', 15],
            'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

            // Promise rules
            ...promisePlugin.configs.recommended.rules,
            'promise/always-return': 'warn',
            'promise/catch-or-return': 'warn',

            // Security rules
            ...securityPlugin.configs.recommended.rules,
            'security/detect-object-injection': 'warn',

            // SonarJS rules adjustments
            'sonarjs/deprecation': 'off', // False positives with SvelteKit stores

            // Node.js rules
            'n/no-missing-import': 'off',
            'n/no-unpublished-import': 'off',
            'n/no-unsupported-features/es-syntax': 'off',

            // General code style
            'max-len': ['warn', { code: 120, ignoreUrls: true, ignoreStrings: true }],
            complexity: ['warn', { max: 15 }],
        },
    },
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: true,
                process: true,
                Buffer: true,
                __dirname: true,
                __filename: true,
                global: true,
                module: true,
                require: true,
                exports: true,
            },
        },
        plugins: {
            import: importPlugin,
            jsdoc: jsdocPlugin,
            n: nodePlugin,
            perfectionist: perfectionistPlugin,
            promise: promisePlugin,
            security: securityPlugin,
            sonarjs: sonarjsPlugin,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',

            // Import rules
            'import/no-unresolved': 'off',
            'import/prefer-default-export': 'off',

            // JSDoc rules (relaxed for JS)
            'jsdoc/check-alignment': 'warn',
            'jsdoc/check-param-names': 'warn',
            'jsdoc/check-tag-names': 'warn',

            // Code quality rules
            'sonarjs/cognitive-complexity': ['error', 15],
            'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

            // Security rules
            'security/detect-object-injection': 'warn',

            // Node.js rules
            'n/no-missing-import': 'off',
            'n/no-unpublished-import': 'off',
            'n/no-unsupported-features/es-syntax': 'off',

            // General code style
            'max-len': ['warn', { code: 120, ignoreUrls: true, ignoreStrings: true }],
            complexity: ['warn', { max: 15 }],
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tsParser,
                project: TSCONFIG_PATH,
                extraFileExtensions: ['.svelte'],
            },
        },
        plugins: {
            svelte: sveltePlugin,
        },
        rules: {
            ...sveltePlugin.configs.recommended.rules,
            ...sveltePlugin.configs.prettier.rules,
            'svelte/no-at-html-tags': 'error',
            'svelte/no-unused-svelte-ignore': 'error',
            'svelte/valid-compile': 'error',
            'svelte/button-has-type': 'error',
            'svelte/no-reactive-reassign': 'error',
            'svelte/require-each-key': 'error',
            'svelte/valid-each-key': 'error',
            'svelte/no-inline-styles': 'warn',
            'svelte/prefer-class-directive': 'warn',
        },
    },
    {
        files: ['**/*.stories.@(js|jsx|ts|tsx|svelte)'],
        rules: {
            'import/no-default-export': 'off',
            'jsdoc/require-jsdoc': 'off',
        },
    },
    {
        files: ['*.config.js', '*.config.ts', '*.config.mjs', '**/.storybook/*.js'],
        rules: {
            'import/no-default-export': 'off',
            'jsdoc/require-jsdoc': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
    {
        files: ['.eslintrc.cjs', '.prettierrc.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
    prettierConfig,
    // Custom Storybook config for Svelte (avoiding React plugin)
    {
        files: ['**/*.stories.@(js|jsx|ts|tsx|svelte)', '.storybook/**/*.@(js|ts)'],
        languageOptions: {
            parserOptions: {
                project: null, // Disable TypeScript project for Storybook files
            },
        },
        rules: {
            'import/no-default-export': 'off',
            'jsdoc/require-jsdoc': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
        },
    },
];
