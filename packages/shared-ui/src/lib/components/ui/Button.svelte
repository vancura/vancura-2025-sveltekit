<script lang="ts">
    export let label: string | undefined = undefined;

    export let variant: 'primary' | 'secondary' | 'danger' = 'primary';

    export let size: 'small' | 'medium' | 'large' = 'medium';

    export let disabled = false;

    export let type: 'button' | 'submit' | 'reset' = 'button';

    export let icon = false;

    export let href: string | undefined = undefined;

    export let target: '_blank' | '_self' | '_parent' | '_top' | undefined = undefined;

    export let rel: string | undefined = undefined;

    export let ariaLabel: string | undefined = undefined;

    export let ariaDescribedBy: string | undefined = undefined;

    // Action props for Storybook integration
    export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
    export let onFocus: ((event: FocusEvent) => void) | undefined = undefined;
    export let onBlur: ((event: FocusEvent) => void) | undefined = undefined;
    export let onKeydown: ((event: KeyboardEvent) => void) | undefined = undefined;

    let className = '';
    export { className as class };

    // eslint-disable-next-line security/detect-object-injection
    $: variantClasses = {
        primary: 'bg-page-bg-light dark:bg-page-bg-dark text-page-text-light dark:text-page-text-dark focus:ring-primary-500 border-2 border-page-text-light dark:border-page-text-dark',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
    }[variant];

    // eslint-disable-next-line security/detect-object-injection
    $: sizeClasses = {
        small: 'text-xs px-2.5 py-1.5',
        medium: 'text-sm px-4 py-2',
        large: 'text-base px-6 py-3',
    }[size];

    $: baseClasses = ['font-medium transition-all duration-200 select-none rounded-full', icon ? 'inline-flex items-center justify-center' : '', disabled ? 'opacity-60 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0.5 cursor-pointer hover:shadow-md', variantClasses, sizeClasses, className].filter(Boolean).join(' ');

    // Handle link vs button rendering.
    $: isLink = href !== undefined;
    $: linkProps = isLink ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : rel } : {};
    $: buttonProps = isLink ? {} : { type, disabled: disabled };
    $: ariaProps = {
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled,
    };
</script>

{#if isLink}
    <a class={baseClasses} {...linkProps} {...ariaProps} on:click={onClick} on:focus={onFocus} on:blur={onBlur} on:keydown={onKeydown} on:keyup on:mouseenter on:mouseleave>
        {#if label}
            {label}
        {:else}
            <slot>Button</slot>
        {/if}
    </a>
{:else}
    <button class={baseClasses} {...buttonProps} {...ariaProps} on:click={onClick} on:focus={onFocus} on:blur={onBlur} on:keydown={onKeydown} on:keyup on:mouseenter on:mouseleave>
        {#if label}
            {label}
        {:else}
            <slot>Button</slot>
        {/if}
    </button>
{/if}
