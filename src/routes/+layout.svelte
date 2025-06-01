<script>
    import '../app.css';
</script>

<div class="min-h-screen bg-slate-100 p-4">
    <header class="mb-6 bg-white p-4">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold">My Portfolio</h1>

            <nav>
                <ul class="flex gap-4">
                    <li>
                        <a href="/" class="text-blue-500 hover:text-blue-700">Home</a>
                    </li>
                    <li>
                        <a href="/blog" class="text-blue-500 hover:text-blue-700">Blog</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="my-8">
        <slot />
    </main>

    <footer class="py-4 text-center text-gray-500">&copy; 2025 My Portfolio. All rights reserved.</footer>
</div>
