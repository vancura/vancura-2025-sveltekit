export async function load({ params }) {
  // In a real app, you would fetch the post data from a database or file system
  // For now, we'll just return the slug
  return {
    slug: params.slug,
    meta: {
      title: params.slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description: `This is the ${params.slug} blog post.`,
    },
  };
}
