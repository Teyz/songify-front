<script lang="ts">
	import type { IGuess } from '$lib/types/guess.js';
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { user } from '$lib/store/user';
	import { goto } from '$app/navigation';
	import Hint from '$lib/components/Hint.svelte';
	import type { IHint } from '$lib/types/hint.js';
	import { toasts, ToastContainer, BootstrapToast }  from "svelte-toasts";
	import { isLoading } from '$lib/store/loader.js';
	import Countdown from '$lib/components/Countdown.svelte';

	export let data;
	let isDisabled = false;
	let isCheckingLoading = false;

	let isTitleCorrect = false;
	let isArtistCorrect = false;

	let showHint = false;
	let artistImageURL = "/image/placeholder_album.svg";
	let hintDisabled = false;
	let hint: IHint = {
		hint: '',
		hint_type: 0,
		has_hint: false
	};

	let audio: HTMLAudioElement;

	let LottiePlayer: any;

	let audioURL: string = "";
	let isAudioPlaying: boolean = false;

	$: remainingTrial = 3 - previousGuesses.length;

	$: isFirstGuess = remainingTrial === 3;

	onMount(async () => {
		if ($user.id === "") {
			const res = await fetch('/api/user', {
				method: 'POST',
			});
			const data =  await res.json();
			if (data.user.data.user.id) {
				user.set({id: data.user.data.user.id});
				guess.user_id = data.user.data.user.id;
			}			
		}
		await fetch(`/api/guesses?user_id=${$user.id}&game_id=${data.game.data.game.id}`, {
			method: 'GET',
		}).then(res => res.json()).then(res => {
			isTitleCorrect = res.data.is_title_correct;
			isArtistCorrect = res.data.is_artist_correct;
			previousGuesses = res.data.guesses;
			if (res.data.guesses.length === 3 || isTitleCorrect && isArtistCorrect) {
				isDisabled = true;
				isLoading.set(true);
				goto(`/daily/${data.game.data.game.id}`)
			}					
		});
		
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;		

		audioURL = `https://files.songify.xyz/${data.game.data.game.song_id}.mp3`;

		isLoading.set(false);
	});

	let previousGuesses: IGuess[] = [];
	
	let guess: IGuess = {
		user_id: $user.id,
		game_id: data.game.data.game.id,
		title: isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : '',
		is_title_correct: isTitleCorrect ? true : false,
		artist: isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : '',
		is_artist_correct: isArtistCorrect ? true : false
	};

	const clearForm = () => {
		guess = {
			user_id: $user.id,
			game_id: data.game.data.game.id,
			title: isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : '',
			is_title_correct: isTitleCorrect ? true : false,
			artist: isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : '',
			is_artist_correct: isArtistCorrect ? true : false
		};
	};

	const getHint = () => {
		fetch(`/api/hint?user_id=${$user.id}&game_id=${data.game.data.game.id}`, {
			method: 'GET',
		}).then(res => res.json()).then(res => {
			if (res.data.data === null && res.data.status.code === 400) {
				hintDisabled = true;
				toasts.add({
					description: 'No more clues available',
					duration: 5000,
					placement: 'top-right',
					type: 'info',
					theme: 'dark',
					onClick: () => {},
					onRemove: () => {},
				});
			} else {
				if (res.data.data.hint_type === 3) {
					hintDisabled = true;
					artistImageURL = res.data.data.hint;
					setTimeout(() => {
						artistImageURL = "/image/placeholder_album.svg";
						hintDisabled = false;
					}, 15000);
					return;
				}
				showHint = res.data.data.has_hint;
				hint = res.data.data;
				hintDisabled = true;
				
				setTimeout(() => {
					showHint = false;
					hintDisabled = false;
				}, 15000);
			}
		});
	};

	const handleOnSubmit = async () => {
		const res = await fetch('', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ guess })
		});
		const { data : guessRes } = await res.json();
			
		if (guessRes.data === null && guessRes.status.code === 400 || guessRes.data.guesses.length === 3) {
			isLoading.set(true);
			goto(`/daily/${data.game.data.game.id}`)
		}
		
		previousGuesses = guessRes.data.guesses;
		isTitleCorrect = guessRes.data.is_title_correct;
		isArtistCorrect = guessRes.data.is_artist_correct;

		if (isTitleCorrect && isArtistCorrect || remainingTrial === 0) {
			isDisabled = true;
			isLoading.set(true);
			setTimeout(() => {
				goto(`/daily/${data.game.data.game.id}`)
			}, 2000);
		}
	}

	const onSubmit = async () => {
		isCheckingLoading = true;
		await handleOnSubmit();
		clearForm();
		isCheckingLoading = false;
	}

	const playAudio = () => {
		isAudioPlaying = !isAudioPlaying;
		audio.volume = 0.1;
		audio.play().then(() => {
			setTimeout(() => {
				isAudioPlaying = false;
			}, 15000);
		});
	}
</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.songify.xyz/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<ToastContainer placement="top-right" let:data={data}>
	<BootstrapToast {data} />
</ToastContainer>

<audio src={audioURL} bind:this={audio} class="hidden"></audio>

<div class="game-root">
	<div class="game-header" in:scale={{ delay: 0, duration: 250 }}>
		<a href="/" class="back-button">
			<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.06641 6.24219C0.929688 6.10547 0.875 5.94141 0.875 5.75C0.875 5.58594 0.929688 5.42188 1.06641 5.28516L5.87891 0.691406C6.15234 0.445312 6.5625 0.445312 6.80859 0.71875C7.05469 0.964844 7.05469 1.40234 6.78125 1.64844L3.14453 5.09375H12.4688C12.8242 5.09375 13.125 5.39453 13.125 5.75C13.125 6.13281 12.8242 6.40625 12.4688 6.40625H3.14453L6.78125 9.87891C7.05469 10.125 7.05469 10.5352 6.80859 10.8086C6.5625 11.082 6.15234 11.082 5.87891 10.8359L1.06641 6.24219Z" fill="white"/>
			</svg>				
		</a>
		<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
		<button
			disabled={hintDisabled}
			on:click={getHint}
			class="hint"
		>
			<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.1875 11.25H2.8125C2.53906 10.4023 1.99219 9.63672 1.44531 8.89844C1.30859 8.70703 1.17188 8.51562 1.03516 8.32422C0.488281 7.53125 0.1875 6.60156 0.1875 5.5625C0.1875 2.91016 2.32031 0.75 5 0.75C7.65234 0.75 9.8125 2.91016 9.8125 5.58984C9.8125 6.60156 9.48438 7.53125 8.9375 8.32422C8.80078 8.51562 8.66406 8.70703 8.52734 8.89844C7.98047 9.63672 7.43359 10.4023 7.1875 11.25ZM5 14.75C3.76953 14.75 2.8125 13.793 2.8125 12.5625V12.125H7.1875V12.5625C7.1875 13.793 6.20312 14.75 5 14.75ZM2.8125 5.5625C2.8125 4.35938 3.76953 3.375 5 3.375C5.21875 3.375 5.4375 3.18359 5.4375 2.9375C5.4375 2.71875 5.21875 2.5 5 2.5C3.30469 2.5 1.9375 3.89453 1.9375 5.5625C1.9375 5.80859 2.12891 6 2.375 6C2.59375 6 2.8125 5.80859 2.8125 5.5625Z" fill="black"/>
			</svg>
		</button>
	</div>
	{#if showHint}
		<div transition:fade={{ delay: 0, duration: 250 }} class="w-full max-w-3xl">
			<Hint hint={hint.hint} hintType={hint.hint_type} />
		</div>
	{/if}
	<div class="flex flex-col md:flex-row gap-6 max-w-3xl w-full" in:scale={{ delay: 50, duration: 250 }}>
		<div class="flex flex-col gap-6 justify-between items-center">
			{#if artistImageURL}
				<img src={artistImageURL} alt="Placeholder for music album" class="artist-cover" in:fade={{ delay: 0, duration: 250 }}>
			{/if}
			<div class="flex gap-2 items-center justify-center">
				<div 
					class="rounded-full bg-white bg-opacity-20 text-white px-4 py-2 text-sm w-full flex justify-center font-bold"
				>
					{remainingTrial} essai{#if remainingTrial > 1}(s){/if}
				</div>
				<button
					disabled={isAudioPlaying}
					on:click={playAudio}
					class="song"
					in:scale={{ delay: 0, duration: 250 }}
				>
					{#if isAudioPlaying }
						<Countdown />
					{:else}
						<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13.6445 0.941406C13.8633 1.10547 14 1.35156 14 1.625V3.59375V10.8125C14 12.043 12.8242 13 11.375 13C9.92578 13 8.75 12.043 8.75 10.8125C8.75 9.60938 9.92578 8.625 11.375 8.625C11.6758 8.625 11.9766 8.67969 12.25 8.76172V4.76953L5.25 6.875V12.5625C5.25 13.793 4.07422 14.75 2.625 14.75C1.17578 14.75 0 13.793 0 12.5625C0 11.3594 1.17578 10.375 2.625 10.375C2.92578 10.375 3.22656 10.4297 3.5 10.5117V6.21875V4.25C3.5 3.86719 3.74609 3.53906 4.10156 3.42969L12.8516 0.804688C13.125 0.722656 13.4258 0.777344 13.6445 0.941406Z" fill="black"/>
						</svg>
					{/if}				
				</button>
			</div>
		</div>
		<div class="lyrics-container">
			<h1>
				{#each data.game.data.lyrics as lyric, index}
					{#if index === 0}
						<p class="previous">
							{lyric}
						</p>
					{/if}
					{#if index === 1}
						<p class="current">
							{lyric}
						</p>
					{/if}
					{#if index >= 2}
						<p class="next">
							{lyric}
						</p>
					{/if}
				{/each}
			</h1>
		</div>
	</div>
	<div class="game-container" in:scale={{ delay: 100, duration: 250 }}>
		<form on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="title">
						What's the name of the music ?
						<span>(Required)</span>
					</label>
					<ul class="previous-guess-list">
						{#each previousGuesses as guess}
							<p
								in:scale={{ delay: 0, duration: 250 }}
								class={guess.is_title_correct ? 'text-primary' : 'text-primary-red'}
							>
								{guess.title}
							</p>
						{/each}
					</ul>
					<div class="flex items-center gap-3">
						<div class="rounded bg-black flex justify-center items-center p-3">
							<img src="/image/vinyl.svg" alt="">
						</div>
						<div class="relative w-full">
							{#if LottiePlayer && isTitleCorrect}
								<div class="status">
									<svelte:component this={LottiePlayer} 
										src="/image/checked.json" 
										autoplay={isTitleCorrect} 
										loop={false} 
										controls={false} 
										renderer="svg" 
										background="transparent" 
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
										]}
									/>
								</div>
							{/if}
							<input 
								type="text"
								placeholder={isTitleCorrect ? previousGuesses[previousGuesses.length -1].title : "Write your answer"} 
								name="title"
								id="title"
								required
								bind:value={guess.title}
								disabled={isTitleCorrect}
								class={isTitleCorrect || isFirstGuess? '' : 'error'}
							>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label for="title">
						Who's the artist ?
						<span>(Required)</span>
					</label>
					<ul class="previous-guess-list">
						{#each previousGuesses as guess}
							<p
								in:scale={{ delay: 0, duration: 250 }}
								class={guess.is_artist_correct ? 'text-primary' : 'text-primary-red'}
							>
								{guess.artist}
							</p>
						{/each}
					</ul>
					<div class="flex items-center gap-3">
						<div class="rounded bg-black w-9 h-9 flex justify-center items-center p-3">
							<img src="/image/song.svg" alt="">
						</div>
						<div class="relative w-full">
							{#if LottiePlayer && isArtistCorrect}
								<div class="status">
									<svelte:component this={LottiePlayer} 
										src="/image/checked.json" 
										autoplay={isArtistCorrect} 
										loop={false} 
										controls={false} 
										renderer="svg" 
										background="transparent" 
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
										]}
									/>
								</div>
							{/if}
							<input 
								type="text" 
								placeholder={isArtistCorrect ? previousGuesses[previousGuesses.length -1].artist : "Write your answer"} 
								name="artist" id="artist" 
								required 
								bind:value={guess.artist} 
								disabled={isArtistCorrect}
								class={isArtistCorrect || isFirstGuess ? '' : 'error'}
							>
						</div>
					</div>
				</div>
			</div>
			<div class="h-[1px] w-full bg-secondary-light"></div>
			<button
				class="bg-black rounded-full text-white py-3 uppercase text-xs font-bold flex items-center justify-center gap-2"
				disabled={isDisabled}
				in:fade={{ delay: 0, duration: 250 }}
			>
				{#if !isCheckingLoading }
					Send
				{:else}
					Checking
					<svelte:component this={LottiePlayer} 
						src="/image/check-loading.json" 
						autoplay={true}
						loop={true} 
						controls={false} 
						renderer="svg" 
						background="transparent" 
						height={16} 
						width={16}
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
						]}
					/>
				{/if}
			</button>
		</form>
	</div>
</div>

<svelte:component this={LottiePlayer}/> 

<style lang="postcss">
	.game-root {
		@apply flex flex-col gap-6 justify-center items-center py-10 px-8 md:px-0 h-full md:h-[100dvh];
	}
	.game-container {
		@apply flex flex-col gap-4 bg-white rounded-lg p-4 max-w-3xl w-full;
	
	}
	.lyrics-container {
		@apply bg-primary p-6 rounded-lg max-w-3xl w-full;
	}
	form {
		@apply flex flex-col gap-4;
	}

	.back-button {
		@apply rounded-full bg-white bg-opacity-20 p-2 flex justify-center items-center w-8 h-8;
		transition: all 0.25s ease;
	} 

	.back-button:hover {
		@apply bg-white bg-opacity-100;
	}

	.back-button:hover path{
		@apply fill-black;
	}

	.status {
		@apply absolute top-1/2 right-16 transform -translate-y-1/2 w-6 object-contain;
	
	}
	label {
		@apply text-black font-normal text-xs;
	
	}
	label span {
		@apply text-secondary-lighter text-xs font-normal;
	}
	.game-header {
		@apply flex justify-between items-center max-w-3xl w-full;
	}
	h1 {
		@apply text-white font-bold text-xl;
	}
	input {
		@apply border rounded-md py-2 px-3 font-medium text-sm w-full;
	}

	input:not(.error) {
		@apply border-black;
	}

	.error {
		@apply border-primary-red;
	}

	.error::placeholder {
		@apply text-primary-red text-opacity-30;
	}

	input::placeholder {
		@apply font-medium text-sm text-opacity-30;
	}
	.previous-guess-list {
		@apply flex gap-2;
	}
	.previous-guess-list p {
		@apply text-xs font-medium;
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

	.previous {
		@apply text-white text-opacity-50;
	}

	.current {
		@apply text-white
	}

	.next {
		@apply text-black;
	}

	.hint {
		@apply rounded-full bg-white p-2 flex justify-center items-center w-8 h-8;
		transition: all 0.25s ease;
	}

	.hint:hover {
		@apply bg-white bg-opacity-20;
	}

	.hint:hover path{
		fill: white;
	}

	.hint:disabled {
		cursor: not-allowed;
	}

	.artist-cover {
		@apply max-w-36 max-h-36 object-cover rounded-xl w-full;
	}

	.song {
		@apply w-12 h-8 rounded-full flex justify-center items-center bg-white;
	}

	.song:disabled {
		cursor: not-allowed;
	}
</style>