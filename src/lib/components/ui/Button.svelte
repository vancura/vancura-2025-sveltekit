<script lang="ts">
    export let variant: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary';
    export let size: 'small' | 'medium' | 'large' = 'medium';
    export let disabled = false;
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let icon = false;

    let className = '';
    export { className as class };

    // Compute Tailwind classes based on variants
    // eslint-disable-next-line security/detect-object-injection
    $: variantClasses = {
        primary:
            'bg-page-bg-light dark:bg-page-bg-dark text-page-text-light dark:text-page-text-dark focus:ring-primary-500 border-2 border-page-text-light dark:border-page-text-dark',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
        outline:
            'bg-transparent text-primary-600 hover:bg-primary-50 border border-primary-300 hover:border-primary-400 focus:ring-primary-500',
    }[variant];

    // eslint-disable-next-line security/detect-object-injection
    $: sizeClasses = {
        small: 'text-xs px-2.5 py-1.5',
        medium: 'text-sm px-4 py-2',
        large: 'text-base px-6 py-3',
    }[size];

    $: baseClasses = [
        'font-medium transition-all duration-200 select-none rounded-full',
        icon ? 'inline-flex items-center justify-center' : '',
        disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0.5 cursor-pointer',
        variantClasses,
        sizeClasses,
        className,
    ]
        .filter(Boolean)
        .join(' ');
</script>

<button {type} class={baseClasses} {disabled} on:click>
    <slot>Button</slot>
</button>
