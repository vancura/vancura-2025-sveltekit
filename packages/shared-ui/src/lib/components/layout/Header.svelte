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
        light: 'header-light',
        dark: 'header-dark',
        transparent: 'header-transparent',
    }[theme];

    $: stickyClasses = sticky ? 'header-sticky' : '';

    const toggleMobileMenu = () => {
        mobileMenuOpen = !mobileMenuOpen;
    };
</script>

<header class="header {themeClasses} {stickyClasses} {className}">
    <div class="header-container">
        <nav class="header-nav">
            <div class="header-brand">
                <a href="/" class="header-brand-link">
                    <span class="header-title">{title}</span>
                </a>
            </div>

            <!-- Desktop navigation -->
            <div class="header-nav-desktop">
                {#each navItems as item (item.url)}
                    <a href={item.url} class="header-nav-link header-nav-link-{theme}">
                        {item.label}
                    </a>
                {/each}
            </div>

            <!-- Mobile menu button -->
            <div class="header-mobile-toggle">
                <button type="button" class="header-mobile-button header-mobile-button-{theme}" aria-expanded={mobileMenuOpen} on:click={toggleMobileMenu}>
                    <span class="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>

                    {#if mobileMenuOpen}
                        <!-- X icon -->
                        <svg class="header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    {:else}
                        <!-- Menu icon -->
                        <svg class="header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    {/if}
                </button>
            </div>
        </nav>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    {#if mobileMenuOpen}
        <div class="header-mobile-menu header-mobile-menu-{theme}">
            <div class="header-mobile-nav">
                {#each navItems as item (item.url)}
                    <a href={item.url} class="header-mobile-link header-mobile-link-{theme}">
                        {item.label}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</header>
