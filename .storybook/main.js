/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
  stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../static"],
  core: {
    disableTelemetry: true,
  },
};

export default config;
