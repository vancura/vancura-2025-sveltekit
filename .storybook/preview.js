import "../src/app.css";

/** @type {import('@storybook/sveltekit').Preview} */
const preview = {
    parameters: {
        // Enhanced Actions configuration for Svelte events
        actions: {
            argTypesRegex: "^on[A-Z].*",
            handles: [
                "click",
                "keydown",
                "keyup",
                "focus",
                "blur",
                "mouseenter",
                "mouseleave",
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        // Basic accessibility configuration
        a11y: {
            config: {
                rules: [
                    {
                        // Disable region rule for component stories
                        id: "region",
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default preview;
