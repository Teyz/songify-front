<script lang="ts">
	import { browser } from '$app/environment';
    import { Hamburger } from 'svelte-hamburgers';

    let open: boolean = false;
    const currentYear = new Date().getFullYear();

    function handleClick() {
        open = !open;
        if (open) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'auto';
        }
    }

    function handleOpenChange(open: boolean) {
        if (browser && open) {
            document.documentElement.style.overflowY = 'hidden';
        } else if (browser && !open) {
            document.documentElement.style.overflowY = 'auto';
        }
    }

    $: handleOpenChange(open);
</script>

<div class="navbar-container pl-8 md:px-64 pr-4 z-20 py-5">
    <div class="flex items-center justify-between w-full">
        <img src="/image/logo.svg" alt="" class="z-20 object-contain w-36 h-8">
        <ul class="hidden md:flex items-center justify-center gap-4">
            <li>
                <a href="/daily">Play</a>
            </li>
            <li>
                <a href="#playlist">Playlist</a>
            </li>
            <li class="flex items-center gap-3">
                <a href="https://ko-fi.com/songify" target="_blank" rel="noopener">Support us</a>
                <img src="/image/link.svg" alt="" class="object-contain w-4 h-4">
            </li>
        </ul>
    </div>
    <div class="block md:hidden z-20">
        <Hamburger bind:open --color="#ffffff" />
    </div>
    <div class="mobile-container z-[9] flex flex-col justify-between w-screen h-dvh bg-[#0C0B0B] px-8 pt-32 pb-8 {open ? "open" : ""}">
        <ul class="flex flex-col items-center gap-16 text-3xl font-century uppercase">
            <li><a href="/daily" on:click={handleClick}>Play</a></li>
            <li><a href="#playlist" on:click={handleClick}>Playlist</a></li>
            <li class="flex items-center gap-3">
                <a href="https://ko-fi.com/songify" target="_blank" rel="noopener" on:click={handleClick}>Support us</a>
                <img src="/image/link.svg" alt="" class="object-contain w-4 h-4">
            </li>
        </ul>
        <div class="flex flex-col gap-8">
            <div class="divider" />
            <ul class="flex items-center justify-between">
                <li>
                    <a href="https://x.com/Songify_game" on:click={handleClick}>
                        <img src="/image/x.svg" alt="" class="object-contain h-5 w-5">
                    </a>
                </li>
                <li>
                    <span class="text-[#a9a6aa] text-sm">@{currentYear} Songify</span>
                </li>
            </ul>
        </div>
    </div>
</div>


<style lang="postcss">
    .navbar-container {
		@apply flex justify-start md:justify-center items-center md:relative w-full fixed bg-[#0C0B0B];
	}
    .navbar-container:after {
        @apply absolute bottom-0 left-0 w-full h-[1px] bg-white bg-opacity-10 z-10;
        content: "";
    }

    .mobile-container {
        @apply absolute top-0 right-0 transition-all duration-300 opacity-0 invisible;
        transform: translateX(100%);
        z-index: 1;
    }
    .mobile-container.open {
        @apply opacity-100 visible;
        transform: translateX(0);
    }
    li {
        @apply text-3xl md:text-base font-bold p-2 text-secondary-lightGrey;
    }
    .divider {
        @apply w-full h-[1px] bg-white bg-opacity-10;
    }
</style>