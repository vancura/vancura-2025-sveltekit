/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
    stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
    framework: {
        name: '@storybook/sveltekit',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../static'],
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (config) => {
        // Add Tailwind CSS v4 plugin for Storybook compatibility
        const { default: tailwindcss } = await import('@tailwindcss/vite');
        config.plugins.unshift(tailwindcss());
        return config;
    },
};

export default config;
