<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>Home | My Portfolio</title>
  <meta name="description" content="Welcome to my portfolio website" />
</svelte:head>

<div class="py-10">
  <header class="max-w-7xl mx-auto px-4">
    <h1 class="text-3xl font-bold text-gray-900 leading-tight">Welcome to My Portfolio</h1>
  </header>
  <main>
    <div class="max-w-7xl mx-auto px-4">
      <div class="py-8 px-4">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <h2 class="text-2xl font-semibold mb-4">About Me</h2>
          <p class="mb-6">This is a modern SvelteKit portfolio built with Svelte 5, Tailwind CSS 4, and Storybook 8.</p>

          <div class="flex gap-4 mt-8">
            <Button variant="primary">Contact Me</Button>
            <Button variant="secondary">View Projects</Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>