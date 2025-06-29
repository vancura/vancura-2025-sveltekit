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
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
    }[variant];

    // eslint-disable-next-line security/detect-object-injection
    $: sizeClasses = {
        small: 'btn-small',
        medium: 'btn-medium',
        large: 'btn-large',
    }[size];

    $: baseClasses = ['btn', icon ? 'btn-icon' : '', disabled ? 'btn-disabled' : '', variantClasses, sizeClasses, className].filter(Boolean).join(' ');

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
