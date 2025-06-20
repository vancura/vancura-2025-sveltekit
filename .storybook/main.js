/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
        "@storybook/addon-links",
        "@storybook/addon-svelte-csf",
        "@storybook/addon-themes",
    ],
    framework: {
        name: "@storybook/sveltekit",
        options: {},
    },
    staticDirs: ["../static"],
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (config) => {
        // Add Tailwind CSS v4 plugin for Storybook compatibility
        const { default: tailwindcss } = await import("@tailwindcss/vite");
        config.plugins.unshift(tailwindcss());

        config.server = config.server || {};
        config.server.fs = config.server.fs || {};
        config.server.fs.allow = [
            ".",
            ".storybook",
            ".svelte-kit",
            "node_modules",
            "src",
            "src/lib",
            "src/routes",
        ];

        return config;
    },
};

export default config;
