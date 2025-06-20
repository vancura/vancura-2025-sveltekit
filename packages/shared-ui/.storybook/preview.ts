import type { Preview } from '@storybook/svelte';
import '../src/lib/styles/app.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            autodocs: 'tag',
        },
    },
};

export default preview;
