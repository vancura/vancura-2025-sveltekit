<script>
	import { Header } from '@vancura/shared-ui';
	import '../app.css';
</script>

<div class="min-h-screen bg-gray-50">
	<Header />
	<main>
		<slot />
	</main>
</div>
