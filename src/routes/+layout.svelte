<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
</script>

<div class="min-h-screen bg-gray-50">
  <Header
    title="My Portfolio"
    navItems={[
      { label: 'Home', url: '/' },
      { label: 'Blog', url: '/blog' }
    ]}
    sticky={true}
  />

  <main>
    <slot />
  </main>

  <footer class="bg-white mt-12 py-6">
    <div class="max-w-7xl mx-auto px-4">
      <p class="text-center text-gray-500 text-sm">
        &copy; 2025 My Portfolio. All rights reserved.
      </p>
    </div>
  </footer>
</div>
