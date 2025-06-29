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

<div class="blog-post-list">
    {#each posts as post (post.slug)}
        <article class="blog-post-item">
            <h2 class="blog-post-title">
                <a href="/blog/{post.slug}">
                    {post.title}
                </a>
            </h2>
            <time class="blog-post-date">{post.date}</time>
            <p class="blog-post-description">{post.description}</p>
            <div class="mt-4">
                <a href="/blog/{post.slug}" class="blog-post-link">Read more &rarr;</a>
            </div>
        </article>
    {/each}
</div>
