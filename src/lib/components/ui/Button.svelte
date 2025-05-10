<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  let className = '';
  export { className as class };

  // Compute Tailwind classes based on variants
  $: variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }[variant];

  $: sizeClasses = {
    small: 'text-sm px-3 py-1',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-6 py-3'
  }[size];
</script>

<button
  {type}
  class="rounded transition-colors duration-200 {variantClasses} {sizeClasses} {className}"
  disabled={disabled}
  on:click
>
  <slot />
</button>
