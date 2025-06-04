/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
    stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-svelte-csf'],
    framework: {
        name: '@storybook/sveltekit',
        options: {},
    },
    staticDirs: ['../static'],
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (config) => {
        // Add Tailwind CSS v4 plugin for Storybook compatibility
        const { default: tailwindcss } = await import('@tailwindcss/vite');
        config.plugins.unshift(tailwindcss());

        // Fix Yarn PnP file serving issues
        config.server = config.server || {};
        config.server.fs = config.server.fs || {};
        config.server.fs.allow = [
            // Default SvelteKit allowed paths
            'src/lib',
            'src/routes',
            '.svelte-kit',
            'src',
            'node_modules',
            '.storybook',
            // Add yarn cache paths for PnP
            '~/.yarn/berry',
            '.yarn',
            // Add the project root for safety
            '.',
        ];

        return config;
    },
};

export default config;
