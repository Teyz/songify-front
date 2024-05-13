<svelte:head>
	<meta name="description" content="Songify, Test your musical skills everyday !">
	<meta name="keywords" content="quizz, quiz, music, musical">
	<meta name="title" content="Songify - Test your musical skills everyday !">
	<link rel="canonical" href="https://www.rm-architecte-paris.com/" /> 
	<title>Songify - Test your musical skills everyday !</title>
</svelte:head>

<div class="home-root">
	<img src="/image/logo.svg" alt="Songify, Test your musical skills everyday !">
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
				<a href="/daily" class="btn-blue">
					Play Solo
				</a>
			</div>
		</div>
	</div>
</div>


<style lang="postcss">
	.home-root {
		@apply flex flex-col justify-start items-center md:justify-center gap-24;
		height: 100dvb;
	}

	img {
		@apply max-w-80 object-contain mt-8;
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
</style>