/**
 * Loads the blog post data for the given slug
 *
 * @type {import('./$types').PageLoad}
 * @param {Object} args - The load function arguments
 * @param {Object} args.params - The route parameters
 * @param {string} args.params.slug - The blog post slug
 * @returns {Promise<{ slug: string; meta: { title: string; description: string } }>} The blog post data
 */
export async function load({ params }) {
    // In a real app, you would fetch the post data from a database or file system
    // For now, we'll just return the slug
    return {
        slug: params.slug,
        meta: {
            title: params.slug
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            description: `This is the ${params.slug} blog post.`,
        },
    };
}
