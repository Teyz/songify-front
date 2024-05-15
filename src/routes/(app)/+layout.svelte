<script lang="ts">
	import Analytics from '$lib/components/analytics.svelte';
	import '../../app.css';
	import '@fontsource-variable/rubik';
</script>

<div>
	<main class="relative">
		<slot />
		<Analytics />
	</main>
</div>
