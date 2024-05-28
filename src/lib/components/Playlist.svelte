<div class="playlist-container" id="playlist">
    <h2 class="text-6xl font-bold text-black text-center">Discover the Songify playlist</h2>
    <p class="text-sm text-[#6f6d71]">Perfect for blindtest evenings and the like !</p>
    <div class="flex flex-col gap-1 cover-container justify-center items-center">
        <a href="https://open.spotify.com/playlist/63NfRpDXXqDkSGeHjkVyOO?si=c1a1320b6923440c" target="_blank" rel="noopener" class="cover">
            <img src="/image/logo-solo.svg" alt="">
        </a>
        <a href="https://open.spotify.com/playlist/63NfRpDXXqDkSGeHjkVyOO?si=c1a1320b6923440c" target="_blank" rel="noopener" class="text-sm text-[#6f6d71]">
            Official playlist
        </a>
    </div>
</div>

<style lang="postcss">
    .playlist-container {
        @apply bg-[#F4F4F4] flex flex-col justify-center items-center gap-6 w-full py-24 px-8 md:px-0;
    }

    .cover {
        @apply bg-black rounded w-52 h-52 flex items-center justify-center;
        box-shadow: 0 1px 20px 0 rgba(31,31,31,.35);
    }
</style>