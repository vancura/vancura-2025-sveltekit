<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head>
  <title>Home | My Portfolio</title>
  <meta name="description" content="Welcome to my portfolio website" />
</svelte:head>

<div class="py-10">
  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-4">Welcome to My Portfolio</h1>
    
    <p class="text-xl text-gray-600 max-w-3xl">
      A modern SvelteKit portfolio showcasing Svelte 5, Tailwind CSS 4, and component-driven design.
    </p>
  </header>

  <main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- About Me Card -->
        <Card title="About Me" elevated={true} variant="default">
          <p class="text-gray-700 mb-4">
            I'm a designer and developer focused on creating beautiful, usable interfaces.
            This portfolio showcases my work with modern web technologies.
          </p>
          <p class="text-gray-700 mb-6">
            Built with SvelteKit 2.20+, Svelte 5+, Tailwind CSS 4, and Storybook 8.4+ for component testing.
          </p>

          <div class="flex gap-4">
            <Button variant="primary" size="medium">Contact Me</Button>
            <Button variant="outline" size="medium">View Resume</Button>
          </div>

          <svelte:fragment slot="footer">
            <div class="text-sm text-gray-500">Last updated: May 2025</div>
          </svelte:fragment>
        </Card>

        <!-- Projects Card -->
        <Card title="Recent Projects" elevated={true} variant="primary">
          <ul class="space-y-4">
            <li class="border-b border-blue-200 pb-2">
              <h3 class="font-medium text-blue-800">E-Commerce Platform</h3>
              <p class="text-blue-700">A full-featured online store with product management</p>
            </li>
            <li class="border-b border-blue-200 pb-2">
              <h3 class="font-medium text-blue-800">Portfolio Website</h3>
              <p class="text-blue-700">This website built with SvelteKit and Tailwind</p>
            </li>
            <li>
              <h3 class="font-medium text-blue-800">Task Management App</h3>
              <p class="text-blue-700">Productivity tool for teams and individuals</p>
            </li>
          </ul>

          <svelte:fragment slot="footer">
            <div class="flex justify-end">
              <Button variant="outline" size="small" icon={true}>
                View All Projects
              </Button>
            </div>
          </svelte:fragment>
        </Card>
      </div>

      <!-- Additional Section -->
      <div class="mt-12">
        <Card hasFooter={false}>
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">Let's Work Together</h2>
              <p class="text-gray-600 mb-6">
                I'm available for freelance projects and collaborations.
                Feel free to reach out if you have a project in mind.
              </p>
              <Button variant="danger" size="large">Get in Touch</Button>
          </div>
            <div class="flex-1 flex justify-center">
              <div class="w-64 h-64 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500 text-sm">Profile Image</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </main>
</div>
