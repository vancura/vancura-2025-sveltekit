<script lang="ts">
    // This would normally fetch blog posts from a data source
    const posts = [
        {
            slug: 'hello-world',
            title: 'Hello World',
            description: 'My first blog post',
            date: '2025-01-01',
        },
        {
            slug: 'getting-started-with-sveltekit',
            title: 'Getting Started with SvelteKit',
            description: 'A guide to building with SvelteKit',
            date: '2025-01-15',
        },
    ];
</script>

<svelte:head>
    <title>Blog | My Portfolio</title>
    <meta name="description" content="Read my latest blog posts" />
</svelte:head>

<div class="flex flex-col gap-10">
    {#each posts as post (post.slug)}
        <article class="border-b border-gray-200 pb-8">
            <h2 class="mb-2 text-2xl font-semibold">
                <a href="/blog/{post.slug}" class="text-blue-600">
                    {post.title}
                </a>
            </h2>
            <time class="mb-3 block text-sm text-gray-500">{post.date}</time>
            <p class="text-gray-700">{post.description}</p>
            <div class="mt-4">
                <a href="/blog/{post.slug}" class="text-blue-600">Read more &rarr;</a>
            </div>
        </article>
    {/each}
</div>
