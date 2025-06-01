let organizeImportsPlugin = require.resolve('prettier-plugin-organize-imports');
let organizeAttributesPlugin = require.resolve('prettier-plugin-organize-attributes');
let jsdocPlugin = require.resolve('prettier-plugin-jsdoc');
let sveltePlugin = require.resolve('prettier-plugin-svelte');
let tailwindPlugin = require.resolve('prettier-plugin-tailwindcss');

// Important: prettier-plugin-tailwindcss must be the last plugin in the array
// or it won't properly sort Tailwind classes
const plugins = [organizeImportsPlugin, organizeAttributesPlugin, jsdocPlugin, sveltePlugin, tailwindPlugin].filter(
    Boolean
);

module.exports = {
    plugins,
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    proseWrap: 'never',
    singleQuote: true,
    singleAttributePerLine: false,
    semi: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'ignore',
    endOfLine: 'lf',
    quoteProps: 'as-needed',

    overrides: [
        {
            files: '*.svelte',
            options: {
                parser: 'svelte',
                printWidth: 1000,
                htmlWhitespaceSensitivity: 'ignore',
            },
        },
        {
            files: '*.mjs',
            options: {
                parser: 'babel',
            },
        },
        {
            files: '*.mdx',
            options: {
                parser: 'mdx',
            },
        },
        {
            files: '*.json',
            options: {
                parser: 'json',
            },
        },
        {
            files: '*.yml',
            options: {
                parser: 'yaml',
            },
        },
        {
            files: '*.yaml',
            options: {
                parser: 'yaml',
            },
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown',
            },
        },
        {
            files: '*.js',
            options: {
                parser: 'babel',
                printWidth: 1000,
            },
        },
        {
            files: '*.ts',
            options: {
                parser: 'typescript',
            },
        },
        {
            files: '*.tsx',
            options: {
                parser: 'typescript',
            },
        },
        {
            files: '*.cjs',
            options: {
                parser: 'babel',
            },
        },

        {
            files: '*.css',
            options: {
                parser: 'css',
                tabWidth: 4,
                singleQuote: false,
            },
        },
    ],
};
