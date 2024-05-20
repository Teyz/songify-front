<script lang="ts">
	import { goto } from "$app/navigation";
	import { isLoading } from '$lib/store/loader.js';
	
	const navigate = async () => {
		isLoading.set(true);
		await goto('/daily');
	};
</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.rm-architecte-paris.com/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<div class="home-root">
	<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
	<div class="flex flex-col gap-6 p-8 md:p-0">
		<div class="home-game-root">
			<div class="home-header">
				<p class="subtitle">Games</p>
				<h1>Music of the day</h1>
			</div>
			<div class="flex flex-col gap-16">
				<div class="home-description">
					<p class="subtitle">Description</p>
					<p class="text">
						Test your musical skills everyday ! Will you find the music and the artist with just a lyric to help you ?
					</p>
				</div>
				<button 
					on:click={navigate}
					class="transform before:ease relative h-12 w-full overflow-hidden border border-primary bg-primary text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-full before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:translate-x-full hover:before:right-[110%] rounded-full m-auto"
				>
					<span class="relative z-10">Single Player</span>
				</button>
			</div>
		</div>
		<div class="flex justify-end">
			<a class="button--pandora" href="https://ko-fi.com/songify">
				<img src="/image/charity.png" alt="">
			</a>
		</div>
	</div>
</div>


<style lang="postcss">
	.home-root {
		@apply flex flex-col justify-center items-center gap-6;
		height: 100dvh;
	}

	.logo {
		@apply max-w-80 object-contain mt-24;
	}

	.home-game-root {
		@apply flex flex-col gap-5 p-8 bg-white rounded-[32px];
	}

	.home-header {
		@apply flex flex-col gap-2;
	}

	.subtitle {
		@apply uppercase;
	}

	.home-description {
		@apply flex flex-col gap-3;
	}

	p {
		@apply text-secondary-grey text-sm font-medium;
	}

	h1 {
		@apply text-primary-black text-2xl font-medium;
	}

	.text {
		@apply text-primary-black font-normal text-base max-w-lg;
	}
</style>