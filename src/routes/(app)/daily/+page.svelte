<script lang="ts">
	import type { Guess } from '$lib/types/guess.js';
	import { onMount } from 'svelte';
	import { user } from '$lib/store/user';

	export let data;
	
	onMount(async () => {
		console.log($user);
		
		if (!$user.id) {
			console.log("coucou");
			
			const res = await fetch('/api/user', {
			method: 'POST',
		});
			const data =  await res.json();
			if (data.user.data.user.id) {
				console.log('ici');
				
				user.set({id: data.user.data.user.id});
			}			
		}
	});
	
	let guess: Guess = {
		song_id: data.game.data.game.song_id,
		title: '',
		artist: ''
	};

	let previousGuesses: { titles: string[], artists: string[] } = {
		titles: [],
		artists: []
	};

	const clearForm = () => {
		guess = {
			song_id: data.game.data.game.song_id,
			title: '',
			artist: ''
		};
	};

	const handleOnSubmit = async () => {
		const res = await fetch('', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ guess })
		});
		const data = await res.json();		
		if (!data.isCorrect) {			
			previousGuesses.titles = [...previousGuesses.titles, guess.title]
			previousGuesses.artists = [...previousGuesses.titles, guess.artist]
		}
	}

	const onSubmit = async () => {
		await handleOnSubmit();
		clearForm();
	}
</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.rm-architecte-paris.com/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<div class="game-root">
	<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
	<div class="game-container">
		<div class="game-header">
			<a href="/" class="button--pandora">
				<img src="image/back.svg" alt="">
			</a>
			<div class="game-user">
				<img src="image/user.svg" alt="">
				<p>1</p>
			</div>
		</div>
		<div class="game-inner">
			<div class="flex flex-col gap-4">
				<p class="subtitle">Lyric</p>
				<h1>
					{data.game.data.lyric}
				</h1>
				<div class="flex flex-col gap-2">
					<h2 class="subtitle">What's the name of the music ?</h2>
					<ul class="previous-guess-list">
						{#each previousGuesses.titles as title}
							<p>{title}</p>
						{/each}
					</ul>
					<input type="text" placeholder="Write your answer" name="title" id="title" required bind:value={guess.title}>
				</div>
				<div class="flex flex-col gap-2">
					<h2 class="subtitle">Who write this music ?</h2>
					<!-- <p class="previous-guess">Dua Lipa</p> -->
					<input type="text" placeholder="Write your answer" name="artist" id="artist" required bind:value={guess.artist}>
				</div>
			</div>
			<button
				class="button--pandora--primary"
				on:click={onSubmit}
			>
				<span>Submit</span>
			</button>
		</div>
	</div>
	<span>Created by <a href="https://twitter.com/bastienrgd">Teyz</a> && DFLMNQ_</span>
</div>

<style lang="postcss">
	.game-root {
		@apply flex flex-col gap-4 justify-between items-center;
		height: 100vh;
	}
	.logo {
		@apply max-w-80 object-contain mt-24;
	}
	.game-container {
		@apply flex flex-col gap-4  max-w-3xl m-auto w-full;
	
	}
	.game-header {
		@apply flex justify-between items-center max-w-3xl m-auto w-full;
	}
	.game-user {
		@apply flex gap-1 items-center rounded-xl bg-white text-primary-black py-2 px-3 font-medium;
	}
	.game-inner {
		@apply flex flex-col gap-10 bg-white rounded-[32px] p-8 max-w-3xl m-auto w-full;
	}
	h2, h1 {
		@apply text-primary-black font-medium text-lg;
	}
	input {
		@apply border border-secondary-light rounded-2xl py-4 px-6 text-secondary-lighter font-medium text-base;
	}
	.previous-guess-list {
		@apply flex gap-2;
	}
	.previous-guess-list p {
		@apply text-primary-red text-xs font-medium;
	}
	.subtitle {
		@apply font-medium text-sm text-secondary-lighter;
	}
	span {
		@apply text-primary-black text-sm ml-auto pr-8 pb-8 font-medium;
	}
</style>