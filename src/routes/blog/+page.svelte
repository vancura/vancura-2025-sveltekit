<script lang="ts">
  // This would normally fetch blog posts from a data source
  const posts = [
    {
      slug: 'hello-world',
      title: 'Hello World',
      description: 'My first blog post',
      date: '2025-01-01'
    },
    {
      slug: 'getting-started-with-sveltekit',
      title: 'Getting Started with SvelteKit',
      description: 'A guide to building with SvelteKit',
      date: '2025-01-15'
    }
  ];
</script>

<svelte:head>
  <title>Blog | My Portfolio</title>
  <meta name="description" content="Read my latest blog posts" />
</svelte:head>

<div class="space-y-10">
  {#each posts as post}
    <article class="border-b pb-8">
      <h2 class="text-2xl font-semibold mb-2">
        <a href="/blog/{post.slug}" class="text-blue-600 hover:text-blue-800">
          {post.title}
        </a>
      </h2>
      <time class="text-sm text-gray-500 mb-3 block">{post.date}</time>
      <p class="text-gray-700">{post.description}</p>
      <div class="mt-4">
        <a href="/blog/{post.slug}" class="text-blue-600 hover:underline">Read more &rarr;</a>
      </div>
    </article>
  {/each}
</div>