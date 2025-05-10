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
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
    outline: 'bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-500 focus:ring-blue-500'
  }[variant];

  $: sizeClasses = {
    small: 'text-xs px-2.5 py-1.5 rounded',
    medium: 'text-sm px-4 py-2 rounded-md',
    large: 'text-base px-6 py-3 rounded-lg'
  }[size];

  $: iconClasses = icon ? 'inline-flex items-center justify-center' : '';

  $: disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-offset-2';
</script>

<button
  {type}
  class="font-medium transition-all duration-200 shadow-sm {variantClasses} {sizeClasses} {iconClasses} {disabledClasses} {className}"
  disabled={disabled}
  on:click
>
  <slot />
</button>
