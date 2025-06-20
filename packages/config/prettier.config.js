/** @type {import('prettier').Config} */
export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 100,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss',
	],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
