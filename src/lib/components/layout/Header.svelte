<script lang="ts">
  export let title: string = 'My Portfolio';
  export let navItems: { label: string; url: string }[] = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' }
  ];
</script>

<header class="bg-white shadow">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <a href="/" class="flex-shrink-0 flex items-center">
          <span class="text-xl font-bold text-gray-900">{title}</span>
        </a>
        <div class="ml-6 flex space-x-8">
          {#each navItems as item}
            <a 
              href={item.url} 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </nav>
</header>