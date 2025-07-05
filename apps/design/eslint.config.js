import baseConfig from '@vancura/config/eslint';

export default [
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.svelte'],
        rules: {},
        settings: {
            react: {
                version: 'detect', // suppress React version warning
            },
        },
    },
];
