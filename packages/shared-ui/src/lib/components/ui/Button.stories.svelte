<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';

    import Button from './Button.svelte';

    const { Story } = defineMeta({
        title: 'UI/Button',
        component: Button,
        tags: ['autodocs'],
        argTypes: {
            // Content

            label: {
                control: 'text',
                description: 'Button text (overrides slot content)',
                table: {
                    category: 'Content',
                },
            },

            icon: {
                control: 'boolean',
                description: 'Whether the button contains an icon (adds flex alignment)',
                table: {
                    category: 'Content',
                },
            },

            // Appearance

            variant: {
                control: 'select',
                options: ['primary', 'secondary', 'danger'],
                description: 'Button style variant',
                table: {
                    category: 'Appearance',
                },
            },

            size: {
                control: 'select',
                options: ['small', 'medium', 'large'],
                description: 'Button size',
                table: {
                    category: 'Appearance',
                },
            },

            class: {
                control: 'text',
                description: 'Additional CSS classes to apply',
                table: {
                    category: 'Appearance',
                },
            },

            // State

            disabled: {
                control: 'boolean',
                description: 'Whether the button is disabled',
                table: {
                    category: 'State',
                },
            },

            // Behavior

            type: {
                control: 'select',
                options: ['button', 'submit', 'reset'],
                description: 'HTML button type attribute',
                table: {
                    category: 'Behavior',
                },
            },

            href: {
                control: 'text',
                description: 'URL to navigate to (renders as link)',
                table: {
                    category: 'Behavior',
                },
            },

            target: {
                control: 'select',
                options: [undefined, '_blank', '_self', '_parent', '_top'],
                description: 'Link target attribute',
                table: {
                    category: 'Behavior',
                },
            },

            rel: {
                control: 'text',
                description: 'Link relationship attribute',
                table: {
                    category: 'Behavior',
                },
            },

            // Accessibility

            ariaLabel: {
                control: 'text',
                description: 'Accessible label for screen readers',
                table: {
                    category: 'Accessibility',
                },
            },

            ariaDescribedBy: {
                control: 'text',
                description: 'ID of element that describes this button',
                table: {
                    category: 'Accessibility',
                },
            },

            // Events

            onClick: {
                action: 'clicked',
                table: {
                    category: 'Events',
                },
            },

            onFocus: {
                action: 'focused',
                table: {
                    category: 'Events',
                },
            },

            onBlur: {
                action: 'blurred',
                table: {
                    category: 'Events',
                },
            },

            onKeydown: {
                action: 'key-pressed',
                table: {
                    category: 'Events',
                },
            },
        },

        args: {
            variant: 'primary',
            size: 'medium',
            disabled: false,
            icon: false,
            type: 'button',
            href: undefined,
            target: undefined,
            ariaLabel: undefined,
            class: '',
            label: 'Click me',
        },

        parameters: {
            a11y: {
                config: {
                    rules: [
                        {
                            // Ensure buttons have accessible names.
                            id: 'button-name',
                            enabled: true,
                        },

                        {
                            // Check color contrast.
                            id: 'color-contrast',
                            enabled: true,
                        },
                    ],
                },
            },
        },
    });
</script>

<Story name="Default" let:args>
    <Button {...args} />
</Story>

<Story name="Variants" asChild>
    <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
    </div>
</Story>

<Story name="Sizes" asChild>
    <div class="flex flex-wrap items-center gap-4">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
    </div>
</Story>

<Story name="States" asChild>
    <div class="flex flex-wrap gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button class="ring-2 ring-blue-500 ring-offset-2">Focused (with ring)</Button>
    </div>
</Story>

<Story name="As Links" asChild>
    <div class="flex flex-wrap gap-4">
        <Button href="https://example.com">Internal Link</Button>
        <Button href="https://external.com" target="_blank">External Link</Button>
    </div>
</Story>

<Story name="With Icons" asChild>
    <div class="flex flex-wrap gap-4">
        <Button icon size="small">
            {@render placeholderIcon({ class: 'mr-2 h-4 w-4' })}
            View
        </Button>

        <Button icon variant="secondary">
            {@render placeholderIcon({ class: 'mr-2 h-4 w-4' })}
            Add Item
        </Button>
    </div>
</Story>

<Story name="Accessibility Examples" asChild>
    <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
            <Button ariaLabel="Save document to favorites">
                {@render placeholderIcon({})}
            </Button>

            <Button variant="danger" ariaLabel="Delete item permanently">
                {@render placeholderIcon({})}
            </Button>

            <Button>Clear text label button</Button>
        </div>

        <p class="text-sm text-gray-600">The first two buttons use aria-label for screen readers since they only contain icons. The third button has clear text content and doesn't need additional labels.</p>
    </div>
</Story>

<Story name="Form Usage" asChild>
    <form class="space-y-4" on:submit|preventDefault={() => console.warn('Form submitted!')}>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" placeholder="Enter your email" />
        </div>

        <div class="flex gap-2">
            <Button type="submit" variant="primary">Submit Form</Button>
            <Button type="reset" variant="secondary">Reset</Button>
        </div>
    </form>
</Story>

<Story name="Combinations" asChild>
    <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="small">Small Primary</Button>
            <Button variant="secondary" size="small">Small Secondary</Button>
            <Button variant="danger" size="small">Small Danger</Button>
        </div>

        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="medium">Medium Primary</Button>
            <Button variant="secondary" size="medium">Medium Secondary</Button>
            <Button variant="danger" size="medium">Medium Danger</Button>
        </div>

        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="large">Large Primary</Button>
            <Button variant="secondary" size="large">Large Secondary</Button>
            <Button variant="danger" size="large">Large Danger</Button>
        </div>
    </div>
</Story>

{#snippet placeholderIcon({ class: className = 'h-4 w-4' })}
    <svg class={className} fill="none" stroke="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" stroke="currentColor" stroke-width="1" fill="none" />
        <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" stroke-width="0.25" />
        <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" stroke-width="0.25" />
    </svg>
{/snippet}
