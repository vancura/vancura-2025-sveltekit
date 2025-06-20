import baseConfig from '@vancura/config/eslint';

export default [
    ...baseConfig,
    {
        // Override problematic rules for this app
        files: ['**/*.ts', '**/*.svelte'],
        rules: {
            'sonarjs/prefer-nullish-coalescing': 'off', // Requires strictNullChecks
        },
        settings: {
            react: {
                version: 'detect', // Suppress React version warning
            },
        },
    },
];
