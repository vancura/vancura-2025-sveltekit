<script lang="ts">
  import { page } from '$app/stores';
  
  $: title = $page.data.meta?.title || 'Blog';
  $: description = $page.data.meta?.description || '';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <header class="mb-8">
    <h1 class="text-4xl font-bold">{title}</h1>
  </header>
  
  <main>
    <slot />
  </main>
</div>