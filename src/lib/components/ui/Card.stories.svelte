<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import { fn } from '@storybook/test';

    import Button from './Button.svelte';
    import Card from './Card.svelte';

    const { Story } = defineMeta({
        title: 'UI/Card',
        component: Card,
        tags: ['autodocs'],
        argTypes: {
            title: {
                control: 'text',
                description: 'Card title displayed in the header',
            },
            elevated: {
                control: 'boolean',
                description: 'Whether to show enhanced shadow for elevated appearance',
            },
            variant: {
                control: 'select',
                options: ['default', 'primary', 'secondary'],
                description: 'Card style variant affecting colors',
            },
            hasFooter: {
                control: 'boolean',
                description: 'Whether to display the footer section',
            },
            content: {
                control: 'text',
                description: 'Main content of the card (alternative to slot)',
            },
            footerContent: {
                control: 'text',
                description: 'Footer content of the card (alternative to footer slot)',
            },
            class: {
                control: 'text',
                description: 'Additional CSS classes to apply',
            },
        },
        args: {
            onClick: fn(),
            title: 'Sample Card Title',
            content:
                'This is the main content of the card. You can edit this text in the controls panel to see how the card adapts to different content lengths.',
            footerContent: 'Footer content with additional information',
            elevated: false,
            variant: 'default',
            hasFooter: true,
            class: '',
        },
    });
</script>

<Story name="Default" let:args>
    <Card
        title={args?.title || 'Sample Card Title'}
        elevated={args?.elevated || false}
        variant={args?.variant || 'default'}
        hasFooter={args?.hasFooter !== false}
        content={args?.content ||
            'This is the main content of the card. You can edit this text in the controls panel to see how the card adapts to different content lengths.'}
        footerContent={args?.footerContent || 'Footer content with additional information'}
        class={args?.class || ''}
    />
</Story>

<Story name="Variants" asChild>
    <div class="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Default Variant" variant="default">
            <p class="mb-4">This is the default card style with clean, minimal styling.</p>
            <Button variant="outline" size="small">Learn More</Button>
            <svelte:fragment slot="footer">Default footer</svelte:fragment>
        </Card>

        <Card title="Primary Variant" variant="primary">
            <p class="mb-4">This card uses the primary color palette with purple accents.</p>
            <Button variant="primary" size="small">Learn More</Button>
            <svelte:fragment slot="footer">Primary footer</svelte:fragment>
        </Card>

        <Card title="Secondary Variant" variant="secondary">
            <p class="mb-4">This card uses the secondary color palette with gray accents.</p>
            <Button variant="secondary" size="small">Learn More</Button>
            <svelte:fragment slot="footer">Secondary footer</svelte:fragment>
        </Card>
    </div>
</Story>

<Story name="Elevation" asChild>
    <div class="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Standard Card" elevated={false}>
            <p>This card has no elevation by default. Hover over it to see a subtle shadow effect.</p>
            <svelte:fragment slot="footer">
                <div class="text-sm text-gray-500">Last updated: today</div>
            </svelte:fragment>
        </Card>

        <Card title="Elevated Card" elevated={true}>
            <p>This card has elevation with a prominent shadow effect. Hover over it to see an enhanced shadow.</p>
            <svelte:fragment slot="footer">
                <div class="text-sm text-gray-500">Last updated: today</div>
            </svelte:fragment>
        </Card>
    </div>
</Story>

<Story name="Layout Options" asChild>
    <div class="max-w-lg space-y-6">
        <Card title="Card With Header and Footer">
            <p>This card displays both a header with title and a footer section.</p>
            <svelte:fragment slot="footer">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">2 min read</span>
                    <Button variant="outline" size="small">Read More</Button>
                </div>
            </svelte:fragment>
        </Card>

        <Card title="Card With Header Only" hasFooter={false}>
            <p>This card displays a header with title but hides the footer section.</p>
        </Card>

        <Card hasFooter={true}>
            <p>This card has no title in the header, but displays a footer section.</p>
            <svelte:fragment slot="footer">
                <div class="flex justify-end space-x-2">
                    <Button variant="secondary" size="small">Cancel</Button>
                    <Button variant="primary" size="small">Submit</Button>
                </div>
            </svelte:fragment>
        </Card>
    </div>
</Story>

<Story name="Content Examples" asChild>
    <div class="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Product Card" elevated variant="default">
            <div class="flex flex-col space-y-4">
                <div class="flex h-48 w-full items-center justify-center rounded bg-gray-200">
                    <span class="text-gray-400">Product Image</span>
                </div>
                <h3 class="text-lg font-medium">Premium Headphones</h3>
                <p class="text-gray-600">High-quality wireless headphones with noise cancellation.</p>
                <div class="text-xl font-bold">$299.99</div>
            </div>
            <svelte:fragment slot="footer">
                <div class="flex justify-between">
                    <Button variant="outline" size="small" icon>
                        <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        Save
                    </Button>
                    <Button variant="primary" size="small">Add to Cart</Button>
                </div>
            </svelte:fragment>
        </Card>

        <Card title="Article Preview" elevated variant="primary">
            <h3 class="text-primary-800 mb-2 text-lg font-medium">Modern Web Development Techniques</h3>
            <p class="text-primary-700 mb-4">
                Learn about the latest trends in web development, including component-driven design, utility-first CSS,
                and modern JavaScript frameworks.
            </p>
            <div class="mt-4 flex items-center">
                <div class="bg-primary-200 flex h-10 w-10 items-center justify-center rounded-full">
                    <span class="text-primary-800 text-xs">JD</span>
                </div>
                <div class="ml-3">
                    <p class="text-primary-800 text-sm font-medium">Jane Doe</p>
                    <p class="text-primary-600 text-xs">Web Developer</p>
                </div>
            </div>
            <svelte:fragment slot="footer">
                <div class="flex items-center justify-between">
                    <span class="text-primary-600 text-sm">May 10, 2025</span>
                    <Button variant="outline" size="small">Read Article</Button>
                </div>
            </svelte:fragment>
        </Card>
    </div>
</Story>
