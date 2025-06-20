/** @type {import('prettier').Config} */
export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 100,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-organize-imports',
		'prettier-plugin-jsdoc',
	],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};