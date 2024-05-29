<script lang="ts">
	import { goto } from "$app/navigation";
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Playlist from "$lib/components/Playlist.svelte";
	import { isLoading } from '$lib/store/loader.js';
	import { user } from "$lib/store/user";
	import { onMount } from "svelte";

	export let data;
	let hasUserFinishedGame = false;
	
	const navigate = async () => {
		isLoading.set(true);
		if (hasUserFinishedGame) {
			await goto(`/daily/${data.game.data.game.id}`)
		} else {
			await goto('/daily');
		}
	};

	onMount(async () => {
		if ($user.id != "") {
			await fetch(`/api/round?user_id=${$user.id}`, {
				method: 'GET',
			}).then(async (res) => {
				if (res.ok) {
					const { data } = await res.json();
					if (data.data.round.status === "finished") {
						hasUserFinishedGame = true;
					}
				}
			});	
		}
	});
</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="songify, quizz, quiz, music, musical">
	<meta name="title" content="Songify | Test your musical skills everyday !">
	<link rel="canonical" href="https://www.songify.xyz/" /> 
	<title>Songify | Test your musical skills everyday !</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.songify.xyz/">
	<meta property="og:type" content="website">
	<meta property="og:title" content="Songify | Test your musical skills everyday !">
	<meta property="og:description" content="Songify, Test your musical skills everyday !">
	<meta property="og:image" content="/image/og.webp">

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image">
	<meta property="twitter:domain" content="songify.xyz">
	<meta property="twitter:url" content="https://www.songify.xyz/">
	<meta name="twitter:title" content="Songify | Test your musical skills everyday !">
	<meta name="twitter:description" content="Songify, Test your musical skills everyday !">
	<meta name="twitter:image" content="/image/og.webp">
</svelte:head>

<Navbar />
<div class="home-root">
	<section class="home-game-root">
		<div class="flex flex-col gap-5 p-6 bg-[#fdfcfe] rounded w-full max-w-xl z-10">
			<div class="home-header">
				<h1 class="title-card">Music of the day</h1>
			</div>
			<button 
				on:click={navigate}
			>
				Play
			</button>
		</div>
		<div class="flex bg-[#fdfcfe] rounded w-full max-w-xl z-10 p-4 gap-3">
			<div class="flex items-center justify-center w-11 h-11 rounded-full bg-[#ebe7ee]">
				<svg width="15" height="16" viewBox="0 0 15 16" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M7.41862 1.00891C7.33976 1.02099 7.24976 1.04386 7.17259 1.07988C7.09767 1.11484 7.06301 1.14861 7.04662 1.17155C7.03723 1.18469 6.99826 1.24007 6.99826 1.39983V2.39983H5.99826C5.06271 2.39983 4.3548 2.78204 3.85504 3.42115C3.33682 4.08388 3.00587 5.07747 2.99999 6.30485C2.98703 9.01007 2.31161 11.2189 1 12.3476V13.0004H14V12.3476C12.6884 11.2189 12.013 9.01007 12 6.30485C11.9948 5.20872 11.6709 4.20313 11.1357 3.49624C10.6154 2.80909 9.90007 2.39983 9 2.39983H8V1.39983C8 1.23918 7.96092 1.18374 7.95189 1.17107C7.93599 1.14876 7.90224 1.11565 7.82843 1.08112C7.75229 1.0455 7.66315 1.02269 7.58398 1.01034C7.54688 1.00455 7.51796 1.00199 7.50195 1.00092L7.49322 1.00042C7.47871 1.00138 7.45251 1.00372 7.41862 1.00891ZM5.08982 14.0004H0.576923C0.258297 14.0004 0 13.7593 0 13.462V12.1158C0 11.9527 0.0791687 11.7985 0.215295 11.6962C1.2609 10.9112 1.98687 9.04044 2 6.30006C2.01335 3.51399 3.5 1.39983 5.99826 1.39983C5.99826 0.000415564 7.5 -0.00394627 7.50437 0.000415562C7.50437 0.000415562 9 0.000415564 9 1.39983C11.5 1.39983 12.9878 3.74707 13 6.30006C13.0131 9.04044 13.7391 10.9112 14.7847 11.6962C14.9208 11.7985 15 11.9527 15 12.1158V13.462C15 13.7593 14.7417 14.0004 14.4231 14.0004H9.91278C9.60836 15.5737 8.55415 16.0004 7.5 16.0004C6.0216 16.0004 5.32035 15.166 5.08982 14.0004ZM6.11636 14.0004C6.17766 14.2232 6.26053 14.4018 6.35852 14.538C6.53291 14.7803 6.83242 15.0004 7.5 15.0004C7.98081 15.0004 8.31225 14.8844 8.52621 14.679C8.64788 14.5622 8.79081 14.3594 8.88762 14.0004H6.11636Z" fill="#0f0d13"></path></svg>
			</div>
			<div class="flex flex-col justify-center items-start">
				<h2 class="text-base font-medium text-[#0f0d13]">Information</h2>
				<p class="text-sm text-[#6f6d71]">You can only play one game a day, new modes coming soon.</p>
			</div>
		</div>
	</section>
</div>
<Playlist />
<Footer />


<style lang="postcss">
	.home-root {
		@apply flex flex-col justify-center items-center gap-6 bg-[#0C0B0B] w-full;
	}

	.home-game-root {
		@apply flex flex-col w-full box-border justify-start items-center relative h-full gap-6 pt-64 pb-12 px-8 md:px-0;
	}

	.home-game-root:after {
		@apply bg-primary absolute left-0 right-0 bottom-[150px] md:bottom-[100px];
		content: "";
		clip-path: ellipse(60% 100px at 50% 100%);
		height: 100px;
		width: 100%;
		z-index: 1;
	}

	.home-game-root:before { 
		@apply bg-primary absolute bottom-0 left-0 right-0 w-full h-[150px] md:h-[100px];
		content: "";
		z-index: 1;
	}

	.home-header {
		@apply flex flex-col gap-2 items-start justify-start;
	}

	.title-card {
        @apply bg-primary text-white text-3xl font-bold py-1 px-2 uppercase flex items-center justify-center;
        border-radius: 9px 9px 9px 9px / 75% 75% 75% 75%;
    }

	button {
		@apply bg-black text-white text-base font-medium py-2 px-4 rounded-xl;
	}
</style>