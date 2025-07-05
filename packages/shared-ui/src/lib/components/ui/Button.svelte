<script lang="ts">
    export let variant: 'primary' | 'secondary' | 'danger' = 'primary';

    export let size: 'small' | 'medium' | 'large' = 'medium';

    export let disabled = false;

    export let type: 'button' | 'submit' | 'reset' = 'button';

    export let href: string | undefined = undefined;

    export let target: '_blank' | '_self' | '_parent' | '_top' | undefined = undefined;

    export let rel: string | undefined = undefined;

    export let ariaLabel: string | undefined = undefined;

    export let ariaDescribedBy: string | undefined = undefined;

    export let onClick: ((event: MouseEvent) => void) | undefined = undefined;

    export let onFocus: ((event: FocusEvent) => void) | undefined = undefined;

    export let onBlur: ((event: FocusEvent) => void) | undefined = undefined;

    export let onKeydown: ((event: KeyboardEvent) => void) | undefined = undefined;

    let className = '';
    export { className as class };

    const baseButtonClasses = 'inline-flex items-center justify-center font-medium border-2 rounded-full transition-all select-none no-underline outline-none focus:outline-2 focus:outline-purple-500 focus:outline-offset-2 active:translate-y-[1px]';

    // eslint-disable-next-line security/detect-object-injection
    $: variantClasses = {
        primary: 'bg-debug text-black border-black hover:bg-purple-50 hover:border-purple-500 dark:bg-black dark:text-white dark:border-white dark:hover:bg-purple-950 dark:hover:border-purple-400',
        secondary: 'bg-debug text-gray-800 border-gray-200 hover:bg-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600',
        danger: 'bg-debug text-white border-red-600 hover:bg-red-700 hover:border-red-700',
    }[variant];

    // eslint-disable-next-line security/detect-object-injection
    $: sizeClasses = {
        small: 'text-xs px-3 py-1',
        medium: 'text-sm px-4 py-2',
        large: 'text-base px-6 py-3',
    }[size];

    $: stateClasses = disabled ? 'opacity-60 cursor-not-allowed hover:shadow-none hover:translate-y-0' : 'cursor-pointer hover:shadow-md';

    $: baseClasses = [baseButtonClasses, stateClasses, variantClasses, sizeClasses, className].filter(Boolean).join(' ');

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
        <slot>Button</slot>
    </a>
{:else}
    <button class={baseClasses} {...buttonProps} {...ariaProps} on:click={onClick} on:focus={onFocus} on:blur={onBlur} on:keydown={onKeydown} on:keyup on:mouseenter on:mouseleave>
        <slot>Button</slot>
    </button>
{/if}
