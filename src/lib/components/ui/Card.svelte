<script lang="ts">
    export let title: string = '';
    export let elevated: boolean = false;
    export let variant: 'default' | 'primary' | 'secondary' = 'default';
    export let hasFooter: boolean = true;
    let className = '';
    export { className as class };

    $: variantClasses = {
        default: 'bg-white border-gray-200',
        primary: 'bg-primary-50 border-primary-200',
        secondary: 'bg-gray-50 border-gray-200',
    }[variant];

    $: headerClasses = {
        default: 'border-gray-200 bg-gray-50',
        primary: 'border-primary-200 bg-primary-100',
        secondary: 'border-gray-200 bg-gray-100',
    }[variant];

    $: footerClasses = headerClasses;

    $: elevationClasses = elevated ? 'shadow-soft hover:shadow-lg' : 'shadow-sm hover:shadow-md';
</script>

<div class="{variantClasses} overflow-hidden rounded-lg border transition-all duration-300 {elevationClasses} {className}">
    {#if title}
        <div class="border-b px-5 py-4 {headerClasses}">
            <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
    {/if}
    <div class="p-5">
        <slot />
    </div>
    {#if hasFooter}
        <div class="border-t px-5 py-4 {footerClasses}">
            <slot name="footer">
                <!-- Default footer content if none is provided -->
            </slot>
        </div>
    {/if}
</div>
