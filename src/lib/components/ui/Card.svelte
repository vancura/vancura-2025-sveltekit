<script lang="ts">
  export let title: string = '';
  export let elevated: boolean = false;
</script>

<div class="bg-white rounded-lg overflow-hidden border border-gray-200 {elevated ? 'shadow-md' : ''}">
  {#if title}
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h3 class="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  {/if}
  <div class="p-4">
    <slot />
  </div>
  <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
    <slot name="footer" />
  </div>
</div>