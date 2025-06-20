import baseConfig from '@vancura/config/eslint';

export default [
    ...baseConfig.map(config => {
        // Override tsconfig path for shared-ui
        if (config.languageOptions?.parserOptions?.project) {
            return {
                ...config,
                languageOptions: {
                    ...config.languageOptions,
                    parserOptions: {
                        ...config.languageOptions.parserOptions,
                        project: './tsconfig.json',
                    },
                },
            };
        }
        return config;
    }),
    {
        // Disable React warnings for Svelte-only package
        settings: {
            react: {
                version: 'detect', // Suppress React version warning
            },
        },
    },
];
