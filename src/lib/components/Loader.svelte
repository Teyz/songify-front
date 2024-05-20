<script lang="ts">
	import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let LottiePlayer: any;

    onMount(async () => {
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;
	});
</script>

<div class="loader-container" transition:fade>
    {#if LottiePlayer}
        <svelte:component this={LottiePlayer} 
            src="/image/loader.json" 
            autoplay={true} 
            loop={true} 
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
    {/if}
</div>

<style lang="postcss">
    .loader-container {
        @apply flex justify-center items-center h-full fixed left-0 top-0 w-full z-50 bg-black;
    }
</style>