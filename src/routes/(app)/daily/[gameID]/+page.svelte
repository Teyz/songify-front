<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/store/user';
	import { goto } from '$app/navigation';
	import type { ISummary } from '$lib/types/summary.js';
    import type { IGuess } from '$lib/types/guess.js';
	import { isLoading } from '$lib/store/loader.js';
    
    export let data;

    let summary: ISummary = {
        song: {
            artist: "",
            artist_image_url: "",
            image_url: "",
            lyrics: "",
            musical_style: "",
            released_year: 0,
            title: "",
        },
        round: {
            hint: 0,
            status: "",
            has_won: false,
        },
    };

    isLoading.set(true);

    let guesses: IGuess[] = [];

	onMount(async () => {
		if ($user.id === "") {
			goto('/');	
		} else {
            await fetch(`/api/summary?user_id=${$user.id}&game_id=${data.gameID}`, {
			    method: 'GET',
            }).then(res => res.json()).then(res => {          
                if (res.data.status.code === 404 || res.data.data.summary.round.status != "finished") {                    
                    goto('/daily');
                } else {
                    summary = res.data.data.summary;        
                }
            });
            await fetch(`/api/guesses?user_id=${$user.id}&game_id=${data.gameID}`, {
			    method: 'GET',
            }).then(res => res.json()).then(res => {        
                res.data.guesses.forEach((guess: IGuess) => {
                    guesses = [...guesses, guess];
                });                       
            });

            isLoading.set(false);
        }
	});

</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.rm-architecte-paris.com/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<div class="summary-root">
	<div class="album-container" style="--image-url: url({summary.song.image_url})">
		<img 
            class="album-cover"
            src={summary.song.image_url} alt="Placeholder for music album"
        >
	</div>
    <div class="summary-header">
		<a href="/" class="rounded-full bg-white bg-opacity-20 p-2 flex justify-center items-center w-8 h-8">
			<img src="/image/back.svg" alt="">
		</a>
		<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
	</div>
    <div class="summary-container">
        <h1 class="w-fit uppercase">
           {#if summary.round.has_won}
                You won !
            {:else}
                You lost !
            {/if}
        </h1>
        <ul>
            {#each guesses as guess}
                <li class="flex items-center gap-4">
                    {#if guess.is_artist_correct || guess.is_title_correct}
                        <img src="/image/checked.svg" alt="" class="w-8 object-contain">
                    {:else}
                        <img src="/image/close.svg" alt="" class="w-8 object-contain">
                    {/if}
                    <p>{guess.artist}</p>
                    <p>{guess.title}</p>             
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="postcss">
	.summary-root {
		@apply flex flex-col gap-4 justify-center items-center py-10;
		height: 100dvh;
	}
    .summary-header {
		@apply flex justify-between items-center max-w-2xl w-full;
	}
    .summary-container {
		@apply flex flex-col gap-4 bg-white rounded-lg p-4 max-w-2xl w-full items-center;
	
	}
    h1 {
        @apply text-3xl font-bold text-black;
    }
    p {
        @apply text-black font-medium text-lg;
    }

    .album-cover {
        @apply w-64 object-contain;
    }

    .album-container {
        @apply relative flex flex-col gap-4 justify-center items-center;
    }

    .album-container:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 12px;
        background: var(--image-url) lightgray 50% / cover no-repeat;
        filter: blur(50px);
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>