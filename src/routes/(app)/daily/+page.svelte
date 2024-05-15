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

	$: remainingTrial = 5 - previousGuesses.length;
	
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
	<div class="flex flex-col gap-4 justify-center items-center">
		<img src="/image/placeholder_album.svg" alt="Placeholder for music album">
		<div class="rounded-full bg-white bg-opacity-20 text-white px-4 py-2 text-sm">
			Il vous reste {remainingTrial} essai(s)
		</div>
	</div>
	<div class="game-header">
		<a href="/" class="rounded-full bg-white bg-opacity-20 p-2 flex justify-center items-center w-8 h-8">
			<img src="/image/back.svg" alt="">
		</a>
		<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
		<div class="rounded-full bg-white flex justify-center items-center w-8 h-8">
			<img src="/image/hint.svg" alt="">
		</div>
	</div>
	<div class="lyrics-container">
		<h1>
			"{data.game.data.lyric}"
		</h1>
	</div>
	<div class="game-container">
		<form on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="title">
						What's the name of the music ?
						<span>(Required)</span>
					</label>
					<!-- <ul class="previous-guess-list">
						{#each previousGuesses as guess}
							<p
								class={guess.is_title_correct ? 'text-secondary-blue' : 'text-primary-red'}
							>
								{guess.title}
							</p>
						{/each}
					</ul> -->
					<div class="flex items-center gap-3">
						<div class="rounded bg-black flex justify-center items-center p-3">
							<img src="/image/vinyl.svg" alt="">
						</div>
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
				</div>
				<div class="flex flex-col gap-2">
					<label for="title">
						Who's the artist ?
						<span>(Required)</span>
					</label>
					<div class="flex items-center gap-3">
						<div class="rounded bg-black w-9 h-9 flex justify-center items-center p-3">
							<img src="/image/song.svg" alt="">
						</div>
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
			</div>
			<div class="h-[1px] w-full bg-secondary-light"></div>
			<button
				class="bg-black rounded-full text-white py-3 uppercase text-xs font-bold"
				disabled={isDisabled}
			>
				Send
			</button>
		</form>
	</div>
</div>

<style lang="postcss">
	.game-root {
		@apply flex flex-col gap-4 justify-center items-center;
		height: 100dvh;
	}
	.game-container {
		@apply flex flex-col gap-4 bg-white rounded-lg p-4 max-w-2xl w-full;
	
	}
	.lyrics-container {
		@apply bg-primary p-6 rounded-lg max-w-2xl w-full;
	}
	form {
		@apply flex flex-col gap-4;
	}

	.status {
		@apply absolute top-1/2 right-20 transform -translate-y-1/2 w-6 object-contain;
	
	}
	label {
		@apply text-black font-normal text-xs;
	
	}
	label span {
		@apply text-secondary-lighter text-xs font-normal;
	}
	.game-header {
		@apply flex justify-between items-center max-w-2xl w-full;
	}
	h1 {
		@apply text-white font-bold text-2xl;
	}
	input {
		@apply border border-black rounded-md py-2 px-3 text-black font-medium text-sm w-full;
	}
	input::placeholder {
		@apply text-black font-medium text-sm text-opacity-30;
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

	button {
		transition: all 0.25s ease;
	}

	button:hover {
		@apply bg-primary text-white;
	}
</style>