<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head>
    <title>Home | My Portfolio</title>
    <meta name="description" content="Welcome to my portfolio website" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 font-sans sm:px-6 lg:px-8">
    <h1 class="mb-6 text-4xl font-bold text-gray-900">Welcome to My Portfolio</h1>

    <p class="mb-12 max-w-3xl text-xl text-gray-600">
        A modern SvelteKit portfolio showcasing Svelte 5, Tailwind CSS 4, and component-driven design.
    </p>

    <div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card title="About Me" elevated={true} variant="default">
            <p class="mb-6 text-gray-700">
                I'm a designer and developer focused on creating beautiful, usable interfaces. This portfolio showcases
                my work with modern web technologies.
            </p>

            <div class="flex flex-wrap gap-4">
                <Button variant="primary">Contact Me</Button>
                <Button variant="outline">View Resume</Button>
            </div>

            <svelte:fragment slot="footer">
                <p class="text-sm text-gray-500">Last updated: May 2025</p>
            </svelte:fragment>
        </Card>

        <Card title="Recent Projects" elevated={true} variant="primary">
            <ul class="space-y-4">
                <li class="border-primary-200 border-b pb-4">
                    <h3 class="text-primary-800 mb-1 font-semibold">E-Commerce Platform</h3>
                    <p class="text-primary-700">A full-featured online store with product management</p>
                </li>
                <li class="border-primary-200 border-b pb-4">
                    <h3 class="text-primary-800 mb-1 font-semibold">Portfolio Website</h3>
                    <p class="text-primary-700">This website built with SvelteKit and Tailwind</p>
                </li>
                <li>
                    <h3 class="text-primary-800 mb-1 font-semibold">Task Management App</h3>
                    <p class="text-primary-700">Productivity tool for teams and individuals</p>
                </li>
            </ul>

            <svelte:fragment slot="footer">
                <div class="flex justify-end">
                    <Button variant="outline" size="small">View All Projects</Button>
                </div>
            </svelte:fragment>
        </Card>
    </div>

    <div class="shadow-soft rounded-lg bg-gray-50 p-8">
        <h2 class="mb-4 text-3xl font-bold text-gray-900">Let's Work Together</h2>
        <p class="mb-6 text-lg text-gray-700">
            I'm available for freelance projects and collaborations. Feel free to reach out if you have a project in
            mind.
        </p>
        <Button variant="primary" size="large">Get in Touch</Button>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card hasFooter={false}>
            <div class="flex flex-col items-center">
                <div class="bg-primary-100 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg class="text-primary-500 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                    </svg>
                </div>
                <h3 class="mb-2 font-semibold text-gray-900">Design</h3>
                <p class="text-center text-gray-600">Beautiful, intuitive interfaces with a focus on user experience</p>
            </div>
        </Card>

        <Card hasFooter={false}>
            <div class="flex flex-col items-center">
                <div class="bg-primary-100 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg class="text-primary-500 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                </div>
                <h3 class="mb-2 font-semibold text-gray-900">Development</h3>
                <p class="text-center text-gray-600">Modern web applications with the latest technologies</p>
            </div>
        </Card>

        <Card hasFooter={false}>
            <div class="flex flex-col items-center">
                <div class="bg-primary-100 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg class="text-primary-500 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <h3 class="mb-2 font-semibold text-gray-900">Performance</h3>
                <p class="text-center text-gray-600">Optimized for speed and responsiveness across all devices</p>
            </div>
        </Card>
    </div>
</div>
