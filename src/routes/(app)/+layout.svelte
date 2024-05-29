<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import Analytics from '$lib/components/analytics.svelte';
	import '../../app.css';
	import '@fontsource-variable/rubik';
	import { isLoading } from '$lib/store/loader.js';
	import { onMount } from 'svelte';

	isLoading.set(true);

	async function fetchData() {
        return new Promise(resolve => resolve("Data loaded"));
    }

	onMount(async () => {
		await fetchData().then(() => {
			isLoading.set(false);
		});
	});
</script>

{#if $isLoading}
	<Loader />
{/if}

<div>
	<main class="relative">
		<slot />
		<Analytics />
	</main>
</div>
