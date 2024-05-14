<script lang="ts">
	import type { IGuess } from '$lib/types/guess.js';
	import { onMount } from 'svelte';
	import { user } from '$lib/store/user';
	import { goto } from '$app/navigation';

	export let data;
	let isDisabled = false;

	let isTitleCorrect = false;
	let isArtistCorrect = false;

	let LottiePlayer: any;
	
	onMount(async () => {
		if ($user.id === "") {
			const res = await fetch('/api/user', {
				method: 'POST',
			});
			const data =  await res.json();
			if (data.user.data.user.id) {
				user.set({id: data.user.data.user.id});
			}			
		}
		await fetch(`/api/guesses?user_id=${$user.id}&game_id=${data.game.data.game.id}`, {
			method: 'GET',
		}).then(res => res.json()).then(res => {	
			console.log(res);
					
			isTitleCorrect = res.data.is_title_correct;
			isArtistCorrect = res.data.is_artist_correct;
			previousGuesses = res.data.guesses;
			if (res.data.guesses.length === 5 || isTitleCorrect && isArtistCorrect) {
				isDisabled = true;
				goto(`/daily/${data.game.data.game.id}`)
			}					
		});
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;
	});

	let previousGuesses: IGuess[] = [];
	
	let guess: IGuess = {
		user_id: $user.id,
		game_id: data.game.data.game.id,
		title: isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : '',
		is_title_correct: false,
		artist: isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : '',
		is_artist_correct: false
	};

	const clearForm = () => {
		guess = {
			user_id: $user.id,
			game_id: data.game.data.game.id,
			title: isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : '',
			is_title_correct: false,
			artist: isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : '',
			is_artist_correct: false
		};
	};

	const handleOnSubmit = async () => {
		const res = await fetch('', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ guess })
		});
		const { data : guessRes } = await res.json();
		console.log(guessRes);
		

		if (guessRes.data === null && guessRes.status.code === 400) {
			goto(`/daily/${data.game.data.game.id}`)
		}

		if (guessRes.data.guesses.length === 5 ) {
			isDisabled = true;
		}
			
		previousGuesses = guessRes.data.guesses;
		isTitleCorrect = guessRes.data.is_title_correct;
		isArtistCorrect = guessRes.data.is_artist_correct;

		if (isTitleCorrect && isArtistCorrect) {
			setTimeout(() => {
				goto(`/daily/${data.game.data.game.id}`)
			}, 2000);
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
				<img src="/image/back.svg" alt="">
			</a>
			<div class="game-user">
				<img src="/image/close.svg" alt="">
				<p>{previousGuesses.length}</p>
			</div>
		</div>
		<div class="game-inner">
			<form on:submit|preventDefault={onSubmit}>
				<div class="flex flex-col gap-4">
					<p class="subtitle">Lyric</p>
					<h1>
						{data.game.data.lyric}
					</h1>
					<div class="flex flex-col gap-2">
						<h2 class="subtitle">What's the name of the music ?</h2>
						<ul class="previous-guess-list">
							{#each previousGuesses as guess}
								<p
									class={guess.is_title_correct ? 'text-secondary-blue' : 'text-primary-red'}
								>
									{guess.title}
								</p>
							{/each}
						</ul>
						<div class="relative w-full">
							{#if LottiePlayer && isTitleCorrect}
								<div class="status">
									<LottiePlayer
										src='/image/checked.json'
										autoplay={true}
										loop={false}
										controls={false}
										renderer='svg'
										background='transparent'
										height={128}
										width={128}
										controlsLayout={[
												"previousFrame",
												"playpause",
												"stop",
												"nextFrame",
												"progress",
												"frame",
												"loop",
												"spacer",
												"background",
												"snapshot",
												"zoom",
												"info"
									]} />
								</div>
							{/if}
							<input 
								class="w-full"
								type="text"
								placeholder={isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : "Write your answer"} 
								name="title"
								id="title"
								required
								bind:value={guess.title}
								disabled={isTitleCorrect
							}>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<h2 class="subtitle">Who write this music ?</h2>
						<ul class="previous-guess-list">
							{#each previousGuesses as guess}
								<p
									class={guess.is_artist_correct ? 'text-secondary-blue' : 'text-primary-red'}
								>
									{guess.artist}
								</p>
							{/each}
						</ul>
						<div class="relative w-full">
							{#if LottiePlayer && isArtistCorrect}
								<div class="status">
									<LottiePlayer
										src='/image/checked.json'
										autoplay={true}
										loop={false}
										controls={false}
										renderer='svg'
										background='transparent'
										height={128}
										width={128}
										controlsLayout={[
												"previousFrame",
												"playpause",
												"stop",
												"nextFrame",
												"progress",
												"frame",
												"loop",
												"spacer",
												"background",
												"snapshot",
												"zoom",
												"info"
									]} />
								</div>
							{/if}
							<input 
								class="w-full"
								type="text" 
								placeholder={isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : "Write your answer"} 
								name="artist" id="artist" 
								required 
								bind:value={guess.artist} 
								disabled={isArtistCorrect}>
						</div>
					</div>
				</div>
				<button
					class="button--pandora--primary"
					disabled={isDisabled}
				>
					<span>Submit</span>
				</button>
			</form>
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

	form {
		@apply flex flex-col gap-10;
	}

	.status {
		@apply absolute top-1/2 right-20 transform -translate-y-1/2 w-6 object-contain;
	
	}

	.game-header {
		@apply flex justify-between items-center max-w-3xl m-auto w-full;
	}
	.game-user {
		@apply flex gap-1 items-center rounded-xl bg-white text-primary-black py-2 px-3 font-medium;
	}
	.game-user img {
		@apply w-6 object-contain;
	
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
		@apply text-xs font-medium;
	}
	.subtitle {
		@apply font-medium text-sm text-secondary-lighter;
	}
	span {
		@apply text-primary-black text-sm ml-auto pr-8 pb-8 font-medium;
	}

	input:disabled:hover {
		cursor: not-allowed;
	}
</style>