<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/store/user';
	import { goto } from '$app/navigation';
	import type { ISummary } from '$lib/types/summary.js';
    import type { IGuess } from '$lib/types/guess.js';
	import { isLoading } from '$lib/store/loader.js';
	import { scale } from 'svelte/transition';
    
    export let data;

    function formatDate(date: Date): string {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() % 100;

        let dayString = day < 10 ? '0' + day : day.toString();
        let monthString = month < 10 ? '0' + month : month.toString();
        let yearString = year < 10 ? '0' + year : year.toString();

        return `${dayString}.${monthString}.${yearString}`;
    }

    let today = new Date();

    let formattedDate = formatDate(today);

    let musicFormatted: string = "";

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
            musicFormatted = summary.song.artist + " - " + summary.song.title;
        }
	});

    const sharedOnTwitter = () => {
        const res = `🇫🇷 Songify - ${formattedDate}%0A%0A`;
        const formattedGuesses = guesses.map((guess: IGuess, index: number) => {
            return `${index + 1}. ${guess.is_artist_correct && guess.is_title_correct ? '✅' : '❌' }%0A`;
        }).join("\n");
        const end = `%0APlay free on https://www.songify.xyz/`;
        
        window.open(
            `https://twitter.com/intent/tweet?text=${res+formattedGuesses+end}`
        , '_blank');
    };

</script>

<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.songify.xyz/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<div class="sumary-root">
	<div class="sumary-header" in:scale={{ delay: 0, duration: 250 }}>
		<a href="/" class="back-button">
			<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.06641 6.24219C0.929688 6.10547 0.875 5.94141 0.875 5.75C0.875 5.58594 0.929688 5.42188 1.06641 5.28516L5.87891 0.691406C6.15234 0.445312 6.5625 0.445312 6.80859 0.71875C7.05469 0.964844 7.05469 1.40234 6.78125 1.64844L3.14453 5.09375H12.4688C12.8242 5.09375 13.125 5.39453 13.125 5.75C13.125 6.13281 12.8242 6.40625 12.4688 6.40625H3.14453L6.78125 9.87891C7.05469 10.125 7.05469 10.5352 6.80859 10.8086C6.5625 11.082 6.15234 11.082 5.87891 10.8359L1.06641 6.24219Z" fill="white"/>
			</svg>				
		</a>
		<img class="logo" src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
	</div>
	<div class="flex flex-col md:flex-row gap-6 max-w-3xl w-full justify-between" in:scale={{ delay: 50, duration: 250 }}>
		<div class="flex flex-col gap-6 justify-between items-center">
			<div class="album-container" style="--image-url: url({summary.song.image_url})">
                <img 
                    class="album-cover"
                    src={summary.song.image_url} alt="Placeholder for music album"
                >
            </div>
            <a href="https://open.spotify.com/playlist/63NfRpDXXqDkSGeHjkVyOO?si=033d6ad645d1443a" class="show-playlist">Discover the playlist on Spotify</a>
		</div>
		<div class="lyrics-container">
			<h1 class="font-bold text-xl">
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
    <div class="sumary-container" in:scale={{ delay: 200, duration: 250 }}>
        <h1 class="w-fit uppercase text-black text-center text-base font-medium m-auto">
            {#if summary.round.has_won}
                YOU FOUND THE MUSIC ON {formattedDate} <br>
                <strong>{musicFormatted}</strong>
             {:else}
                YOU HAVEN'T FOUND THE MUSIC ON {formattedDate} <br>
                 <strong>{musicFormatted}</strong>
             {/if}
         </h1>
        <ul class="flex flex-col gap-4 w-full">
            {#each guesses as guess, index}
                <li class="flex items-center justify-start gap-4 w-full">
                    <span class="text-secondary-light text-xs">{index + 1}.</span>
                    <div class="flex gap-3 justify-center items-center w-full">
                        {#if guess.is_artist_correct}
                            <img src="/image/song-correct.svg" alt="" class="w-9 object-contain">
                        {:else}
                            <img src="/image/song-wrong.svg" alt="" class="w-9 object-contain">
                        {/if}
                        <div class={guess.is_artist_correct ? "guess-correct" : "guess-wrong"}>
                            {guess.artist}
                            {#if guess.is_artist_correct}
                                <img src="/image/checked-summary.svg" alt="">
                            {/if}
                        </div>
                    </div>
                    <div class="flex gap-3 justify-center items-center w-full">
                        {#if guess.is_title_correct}
                            <img src="/image/title-correct.svg" alt="" class="w-9 object-contain">
                        {:else}
                            <img src="/image/title-wrong.svg" alt="" class="w-9 object-contain">
                        {/if}
                        <div class={guess.is_title_correct ? "guess-correct" : "guess-wrong"}>
                            {guess.title}
                            {#if guess.is_title_correct}
                                <img src="/image/checked-summary.svg" alt="">
                            {/if}
                        </div> 
                    </div>
                </li>
            {/each}
        </ul>
        <div class="bg-secondary-lightest w-full h-[1px]" />
        <button
            class="shared-button"
            on:click={sharedOnTwitter}
        >
            <img src="/image/shared.svg" alt="">
            Share on twitter
        </button>
    </div>
</div>

<style lang="postcss">
    .album-cover {
        @apply object-cover rounded-xl w-40;
    }

    .album-container {
        @apply relative flex flex-col gap-4 justify-center items-center w-40;
    }

    .album-container:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
        background: var(--image-url) lightgray 50% / cover no-repeat;
        filter: blur(50px);
        width: 50%;
        height: 50%;
        z-index: -1;
    }

    .sumary-root {
		@apply flex flex-col gap-6 justify-center items-center py-10 px-8 md:px-0 h-full md:h-[100dvh];
	}
	.sumary-container {
		@apply flex flex-col gap-4 bg-white rounded-lg p-4 max-w-3xl w-full justify-center items-start;
	}
	.lyrics-container {
		@apply bg-primary p-6 rounded-lg flex flex-col justify-center items-start w-full max-w-xl;
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
	.sumary-header {
		@apply flex justify-between items-center max-w-3xl w-full;
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
    .show-playlist {
        @apply bg-white rounded-full flex items-center justify-center py-2 px-4 text-black text-xs font-medium text-center;
    }

    .guess-correct {
        @apply border border-black rounded text-xs w-full flex justify-between items-center; 
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        padding: 10px;
    }

    .guess-wrong {
        @apply border border-secondary-lightest rounded text-xs w-full; 
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        padding: 10px;
    }

    .shared-button {
        @apply flex justify-center items-center gap-2 bg-black text-white text-xs font-bold w-full py-3 rounded-full;
    }
</style>