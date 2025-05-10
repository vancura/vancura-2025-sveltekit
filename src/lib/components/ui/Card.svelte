<script lang="ts">
  export let title: string = '';
  export let elevated: boolean = false;
</script>

<div class="card {elevated ? 'elevated' : ''}">
  {#if title}
    <div class="card-header">
      <h3 class="card-title">{title}</h3>
    </div>
  {/if}
  <div class="card-body">
    <slot />
  </div>
  <div class="card-footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    @apply bg-white rounded-lg overflow-hidden border border-gray-200;
  }
  
  .elevated {
    @apply shadow-md;
  }
  
  .card-header {
    @apply px-4 py-3 border-b border-gray-200 bg-gray-50;
  }
  
  .card-title {
    @apply text-lg font-medium text-gray-900;
  }
  
  .card-body {
    @apply p-4;
  }
  
  .card-footer {
    @apply px-4 py-3 border-t border-gray-200 bg-gray-50;
  }
</style>