<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
  {type}
  class="btn {variant} {size}"
  disabled={disabled}
  on:click
>
  <slot />
</button>

<style>
  .btn {
    @apply px-4 py-2 rounded transition-colors duration-200;
  }
  
  .primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
  
  .danger {
    @apply bg-red-600 text-white hover:bg-red-700;
  }
  
  .small {
    @apply text-sm px-3 py-1;
  }
  
  .medium {
    @apply text-base;
  }
  
  .large {
    @apply text-lg px-6 py-3;
  }
</style>