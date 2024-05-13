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
			<!-- <div class="home-game-infos">
	
			</div> -->
			<div class="flex flex-col gap-16">
				<div class="home-description">
					<p class="subtitle">Description</p>
					<p class="text">
						Test your musical skills everyday ! Will you find the music and the artist with just a lyric to help you ?
					</p>
				</div>
				<div class="home-play-buttons">
					<a href="/daily" class="button--pandora--primary">
						<span>Single Player</span>
					</a>
				</div>
			</div>
		</div>
		<div class="flex justify-end">
			<a class="button--pandora" href="https://ko-fi.com/songify">
				<img src="image/charity.png" alt="">
			</a>
		</div>
	</div>
	<span>Created by <a href="https://twitter.com/bastienrgd">Teyz</a> && DFLMNQ_</span>
</div>


<style lang="postcss">
	.home-root {
		@apply flex flex-col justify-between items-center md:justify-between gap-24;
		height: 100vh;
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

	/* .home-game-infos {
		@apply flex gap-2;
	} */

	.home-play-buttons {
		@apply flex gap-4;
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

	span {
		@apply text-primary-black text-sm ml-auto pr-8 pb-8 font-medium;
	}
</style>