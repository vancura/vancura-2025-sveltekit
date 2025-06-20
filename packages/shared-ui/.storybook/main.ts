import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-themes',
		'@storybook/addon-svelte-csf'
	],
	framework: {
		name: '@storybook/svelte-vite',
		options: {}
	},
	staticDirs: ['../static']
};

export default config;