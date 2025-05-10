<script>
  export let data;
</script>

<article class="prose lg:prose-xl">
  <h1>{data.meta.title}</h1>
  
  <p>This is a placeholder for the {data.slug} blog post content.</p>
  
  <p>In a real application, this would be rendered from markdown or MDX content.</p>
  
  <div class="mt-8">
    <a href="/blog" class="text-blue-600 hover:underline">&larr; Back to blog</a>
  </div>
</article>