<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen bg-gray-50">
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <a href="/" class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-gray-900">My Portfolio</span>
          </a>
          <div class="ml-6 flex gap-8">
            <a href="/" class="border-transparent text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Home
            </a>
            <a href="/blog" class="border-transparent text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Blog
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>

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