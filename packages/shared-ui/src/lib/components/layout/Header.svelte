<script lang="ts">
    export let title: string = 'My Portfolio';
    export let navItems: { label: string; url: string }[] = [
        { label: 'Home', url: '/' },
        { label: 'Blog', url: '/blog' },
    ];
    export let theme: 'light' | 'dark' | 'transparent' = 'light';
    export let sticky: boolean = false;
    let className = '';
    export { className as class };

    // Mobile menu state
    let mobileMenuOpen = false;

    // eslint-disable-next-line security/detect-object-injection
    $: themeClasses = {
        light: 'bg-white text-gray-800 shadow-sm border-b border-gray-200',
        dark: 'bg-gray-900 text-white',
        transparent: 'bg-transparent text-white',
    }[theme];

    // eslint-disable-next-line security/detect-object-injection
    $: mobileBgClasses = {
        light: 'bg-white',
        dark: 'bg-gray-900',
        transparent: 'bg-gray-900',
    }[theme];

    $: stickyClasses = sticky ? 'sticky top-0 z-50' : '';

    const toggleMobileMenu = () => {
        mobileMenuOpen = !mobileMenuOpen;
    };
</script>

<header class="{themeClasses} {stickyClasses} transition-colors duration-200 {className}">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav class="flex h-16 items-center justify-between">
            <div class="flex-shrink-0">
                <a href="/" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold tracking-tight">{title}</span>
                </a>
            </div>

            <!-- Desktop navigation -->
            <div class="hidden md:flex md:items-center md:space-x-8">
                {#each navItems as item (item.url)}
                    <a href={item.url} class="group relative flex items-center px-1 py-2 text-sm font-medium">
                        <span class="relative transition-colors duration-200 {theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'} after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100">
                            {item.label}
                        </span>
                    </a>
                {/each}
            </div>

            <!-- Mobile menu button -->
            <div class="flex md:hidden">
                <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md p-2
            {theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'}"
                    aria-expanded={mobileMenuOpen}
                    on:click={toggleMobileMenu}
                >
                    <span class="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>

                    {#if mobileMenuOpen}
                        <!-- X icon -->
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    {:else}
                        <!-- Menu icon -->
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    {/if}
                </button>
            </div>
        </nav>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    {#if mobileMenuOpen}
        <div class="md:hidden {mobileBgClasses} shadow-lg">
            <div class="space-y-1 border-t border-gray-200 px-2 pt-2 pb-3">
                {#each navItems as item (item.url)}
                    <a href={item.url} class="block rounded-md px-3 py-2 text-base font-medium {theme === 'light' ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}">
                        {item.label}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</header>
