<script lang="ts">
    export let title: string = '';
    export let elevated: boolean = false;
    export let variant: 'default' | 'primary' | 'secondary' = 'default';
    export let hasFooter: boolean = true;
    export let content: string = '';
    export let footerContent: string = '';
    export let role: string = 'article';
    export let ariaLabel: string | undefined = undefined;
    export let ariaLabelledBy: string | undefined = undefined;

    let className = '';
    export { className as class };

    $: variantClasses = {
        default: 'bg-white border-gray-200',
        primary: 'bg-primary-50 border-primary-200',
        secondary: 'bg-gray-50 border-gray-200',
    }[variant];

    $: headerFooterClasses = {
        default: 'border-gray-200 bg-gray-50',
        primary: 'border-primary-200 bg-primary-100',
        secondary: 'border-gray-200 bg-gray-100',
    }[variant];

    $: baseClasses = [
        'overflow-hidden rounded-lg border transition-all duration-300',
        elevated ? 'shadow-soft hover:shadow-lg' : 'shadow-sm hover:shadow-md',
        variantClasses,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Generate unique IDs for accessibility
    let cardCounter = 0;
    $: titleId = title ? `card-title-${++cardCounter}` : undefined;
    $: computedAriaLabelledBy = ariaLabelledBy || titleId;
</script>

<div class={baseClasses} {role} aria-label={ariaLabel} aria-labelledby={computedAriaLabelledBy}>
    {#if title}
        <header class="border-b px-5 py-4 {headerFooterClasses}">
            <h3 id={titleId} class="text-lg font-semibold text-gray-900">{title}</h3>
        </header>
    {/if}

    <main class="p-5">
        {#if content}
            {content}
        {:else}
            <slot />
        {/if}
    </main>

    {#if hasFooter}
        <footer class="border-t px-5 py-4 {headerFooterClasses}">
            {#if footerContent}
                {footerContent}
            {:else}
                <slot name="footer">
                    <!-- Default footer content if none is provided -->
                </slot>
            {/if}
        </footer>
    {/if}
</div>
