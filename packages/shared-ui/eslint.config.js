import baseConfig from '@vancura/config/eslint';

export default [
    {
        ignores: ['.storybook/**/*'],
    },
    ...baseConfig.map((config) => {
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
        settings: {
            react: {
                version: 'detect', // suppress React version warning
            },
        },
    },
];
