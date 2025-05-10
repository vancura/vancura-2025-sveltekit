<script>
  export let data;
</script>

<article class="max-w-prose mx-auto">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">{data.meta.title}</h1>

  <p class="mb-6 text-lg leading-relaxed">This is a placeholder for the {data.slug} blog post content.</p>

  <p class="mb-6 text-lg leading-relaxed">In a real application, this would be rendered from markdown or MDX content.</p>

  <div class="mt-8">
    <a href="/blog" class="text-blue-600">&larr; Back to blog</a>
  </div>
</article>