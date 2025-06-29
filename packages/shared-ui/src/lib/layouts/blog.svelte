<script lang="ts">
    export let title: string = '';
    export let date: string = '';
    export let description: string = '';
    export let author: string = 'Václav Vančura';
</script>

<article class="blog-article">
    <header class="blog-header">
        <h1 class="blog-title">{title}</h1>
        {#if date}
            <time class="blog-date" datetime={date}>
                {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </time>
        {/if}
        {#if author}
            <p class="blog-author">By {author}</p>
        {/if}
        {#if description}
            <p class="blog-description">{description}</p>
        {/if}
    </header>

    <div class="blog-content">
        <slot />
    </div>
</article>
