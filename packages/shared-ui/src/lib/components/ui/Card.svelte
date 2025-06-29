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

    // eslint-disable-next-line security/detect-object-injection
    $: variantClasses = {
        default: 'card-default',
        primary: 'card-primary',
        secondary: 'card-secondary',
    }[variant];

    $: baseClasses = ['card', elevated ? 'card-elevated' : '', variantClasses, className].filter(Boolean).join(' ');

    // Generate unique IDs for accessibility
    let cardCounter = 0;
    $: titleId = title ? `card-title-${++cardCounter}` : undefined;
    $: computedAriaLabelledBy = ariaLabelledBy ?? titleId;
</script>

<div class={baseClasses} {role} aria-label={ariaLabel} aria-labelledby={computedAriaLabelledBy}>
    {#if title}
        <header class="card-header card-header-{variant}">
            <h3 id={titleId} class="card-title">{title}</h3>
        </header>
    {/if}

    <main class="card-content">
        {#if content}
            {content}
        {:else}
            <slot />
        {/if}
    </main>

    {#if hasFooter}
        <footer class="card-footer card-footer-{variant}">
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
