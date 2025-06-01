<script lang="ts">
    export let variant: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary';
    export let size: 'small' | 'medium' | 'large' = 'medium';
    export let disabled = false;
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let icon = false;
    let className = '';
    export { className as class };

    // Compute Tailwind classes based on variants
    $: variantClasses = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 border border-transparent',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
        outline:
            'bg-transparent text-primary-600 hover:bg-primary-50 border border-primary-300 hover:border-primary-400 focus:ring-primary-500',
    }[variant];

    $: sizeClasses = {
        small: 'text-xs px-2.5 py-1.5 rounded-md',
        medium: 'text-sm px-4 py-2 rounded-md',
        large: 'text-base px-6 py-3 rounded-md',
    }[size];

    $: baseClasses = [
        'font-medium shadow-sm transition-all duration-200',
        icon ? 'inline-flex items-center justify-center' : '',
        disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0.5',
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
