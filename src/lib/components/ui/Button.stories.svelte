<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from '@storybook/test';

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
            class: {
                control: 'text',
                description: 'Additional CSS classes to apply',
            },
        },
        args: {
            onClick: fn(),
            variant: 'primary',
            size: 'medium',
            disabled: false,
            icon: false,
            type: 'button',
            class: '',
        },
    });
</script>

<Story name="Default" let:args>
    <Button
        variant={args?.variant || 'primary'}
        size={args?.size || 'medium'}
        disabled={args?.disabled || false}
        icon={args?.icon || false}
        type={args?.type || 'button'}
        class={args?.class || ''}
        on:click={args.onClick}
    >
        Click me
    </Button>
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

<Story name="With Icons" asChild>
    <div class="flex flex-wrap gap-4">
        <Button icon size="small">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
            </svg>
            View
        </Button>
        <Button icon variant="outline">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
            </svg>
            Download
        </Button>
    </div>
</Story>

<Story name="Combinations" asChild>
    <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="small">Small Primary</Button>
            <Button variant="secondary" size="small">Small Secondary</Button>
            <Button variant="danger" size="small">Small Danger</Button>
            <Button variant="outline" size="small">Small Outline</Button>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="medium">Medium Primary</Button>
            <Button variant="secondary" size="medium">Medium Secondary</Button>
            <Button variant="danger" size="medium">Medium Danger</Button>
            <Button variant="outline" size="medium">Medium Outline</Button>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="large">Large Primary</Button>
            <Button variant="secondary" size="large">Large Secondary</Button>
            <Button variant="danger" size="large">Large Danger</Button>
            <Button variant="outline" size="large">Large Outline</Button>
        </div>
    </div>
</Story>
