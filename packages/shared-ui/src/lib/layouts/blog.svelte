<script lang="ts">
    export let title: string = '';
    export let date: string = '';
    export let description: string = '';
    export let author: string = 'Václav Vančura';
</script>

<article class="mx-auto max-w-4xl px-4 py-8">
    <header class="mb-8 text-center">
        <h1 class="mb-4 text-4xl font-bold">{title}</h1>
        {#if date}
            <time class="text-sm text-gray-600" datetime={date}>
                {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </time>
        {/if}
        {#if author}
            <p class="mt-2 text-sm text-gray-600">By {author}</p>
        {/if}
        {#if description}
            <p class="mt-4 text-lg text-gray-700">{description}</p>
        {/if}
    </header>

    <div class="prose prose-lg mx-auto">
        <slot />
    </div>
</article>
