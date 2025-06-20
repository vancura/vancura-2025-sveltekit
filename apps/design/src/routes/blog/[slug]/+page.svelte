<script>
    export let data;
</script>

<article class="mx-auto max-w-prose">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">{data.meta.title}</h1>

    <p class="mb-6 text-lg leading-relaxed">
        This is a placeholder for the {data.slug} blog post content.
    </p>

    <p class="mb-6 text-lg leading-relaxed">In a real application, this would be rendered from markdown or MDX content.</p>

    <div class="mt-8">
        <a href="/blog" class="text-blue-600">&larr; Back to blog</a>
    </div>
</article>
