<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from 'storybook/test';

    import Button from './Button.svelte';

    const { Story } = defineMeta({
        title: 'UI/Button',
        component: Button,
        tags: ['autodocs'],
        argTypes: {
            variant: {
                control: 'select',
                options: ['primary', 'secondary', 'danger', 'outline'],
                description: 'Button style variant',
            },
            size: {
                control: 'select',
                options: ['small', 'medium', 'large'],
                description: 'Button size',
            },
            disabled: {
                control: 'boolean',
                description: 'Whether the button is disabled',
            },
            icon: {
                control: 'boolean',
                description: 'Whether the button contains an icon (adds flex alignment)',
            },
            type: {
                control: 'select',
                options: ['button', 'submit', 'reset'],
                description: 'HTML button type attribute',
            },
            href: {
                control: 'text',
                description: 'URL to navigate to (renders as link)',
            },
            target: {
                control: 'select',
                options: [undefined, '_blank', '_self', '_parent', '_top'],
                description: 'Link target attribute',
            },
            ariaLabel: {
                control: 'text',
                description: 'Accessible label for screen readers',
            },
            class: {
                control: 'text',
                description: 'Additional CSS classes to apply',
            },
            // Actions configuration for events
            onClick: {
                action: 'clicked',
                description: 'Fired when button is clicked',
            },
            onKeydown: {
                action: 'keydown',
                description: 'Fired when key is pressed down',
            },
            onFocus: {
                action: 'focused',
                description: 'Fired when button receives focus',
            },
            onBlur: {
                action: 'blurred',
                description: 'Fired when button loses focus',
            },
        },
        args: {
            // Use action functions for better Actions panel integration
            onClick: fn(),
            onKeydown: fn(),
            onFocus: fn(),
            onBlur: fn(),
            variant: 'primary',
            size: 'medium',
            disabled: false,
            icon: false,
            type: 'button',
            href: undefined,
            target: undefined,
            ariaLabel: undefined,
            class: '',
        },
        parameters: {
            // Enhanced accessibility testing for buttons
            a11y: {
                config: {
                    rules: [
                        {
                            // Ensure buttons have accessible names
                            id: 'button-name',
                            enabled: true,
                        },
                        {
                            // Check color contrast
                            id: 'color-contrast',
                            enabled: true,
                        },
                    ],
                },
            },
            // Ensure Actions are enabled
            actions: {
                handles: ['click', 'keydown', 'focus', 'blur'],
            },
        },
    });
</script>

<Story name="Actions Test" let:args>
    <div class="space-y-6 rounded-lg border border-gray-200 p-4">
        <div>
            <h3 class="mb-2 text-lg font-semibold">Actions Test</h3>
            <p class="mb-4 text-sm text-gray-600">
                Click this button and watch the <strong>Actions panel</strong> at the bottom of Storybook. You should see "clicked" events logged there.
            </p>
        </div>

        <Button variant="primary" on:click={args.onClick} on:focus={args.onFocus} on:blur={args.onBlur}>Test Actions Logging</Button>

        <div class="space-y-1 text-xs text-gray-500">
            <p>• Click the button → Should see "clicked" in Actions panel</p>
            <p>• Tab to focus → Should see "focused" in Actions panel</p>
            <p>• Tab away → Should see "blurred" in Actions panel</p>
        </div>
    </div>
</Story>

<Story name="Default" let:args>
    <Button variant={args?.variant || 'primary'} size={args?.size || 'medium'} disabled={args?.disabled || false} icon={args?.icon || false} type={args?.type || 'button'} href={args?.href} target={args?.target} ariaLabel={args?.ariaLabel} class={args?.class || ''} on:click={args.onClick} on:keydown={args.onKeydown} on:focus={args.onFocus} on:blur={args.onBlur}>Click me</Button>
</Story>

<Story name="Actions Demo" let:args>
    <div class="space-y-4">
        <p class="text-sm text-gray-600">Click these buttons and check the Actions panel below to see event logging:</p>
        <div class="flex flex-wrap gap-4">
            <Button variant="primary" on:click={args.onClick} on:keydown={args.onKeydown} on:focus={args.onFocus} on:blur={args.onBlur}>Primary Action</Button>
            <Button variant="secondary" on:click={args.onClick} on:keydown={args.onKeydown} on:focus={args.onFocus} on:blur={args.onBlur}>Secondary Action</Button>
            <Button variant="outline" on:click={args.onClick} on:keydown={args.onKeydown} on:focus={args.onFocus} on:blur={args.onBlur}>Outline Action</Button>
        </div>
        <p class="text-xs text-gray-500">Try clicking, pressing Tab to focus, or pressing Enter/Space while focused.</p>
    </div>
</Story>

<Story name="Variants" asChild>
    <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>
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
        <Button href="#section" variant="outline">Anchor Link</Button>
    </div>
</Story>

<Story name="With Icons" asChild>
    <div class="flex flex-wrap gap-4">
        <Button icon size="small">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
        </Button>

        <Button icon variant="secondary">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
        </Button>
    </div>
</Story>

<Story name="Accessibility Examples" asChild>
    <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
            <Button ariaLabel="Save document to favorites">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
            </Button>

            <Button variant="danger" ariaLabel="Delete item permanently">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 012 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v3a1 1 0 11-2 0V9z" clip-rule="evenodd" />
                </svg>
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
            <Button type="button" variant="outline">Cancel</Button>
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
