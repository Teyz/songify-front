<script lang="ts">
    import { Hamburger } from 'svelte-hamburgers';
    let open: boolean = false;

    function handleClick() {
        open = !open;
    }
</script>

<div class="navbar-container pl-8 md:px-64 pr-4 z-20 pb-16">
    <div class="flex items-center justify-between w-full">
        <img src="/image/logo.svg" alt="">
        <ul class="hidden md:flex items-center justify-center gap-4">
            <li>
                <a href="/daily">Jouer</a>
            </li>
            <li>
                <a href="#playlist">Playlist</a>
            </li>
            <li class="flex items-center gap-3">
                <a href="https://ko-fi.com/songify" target="_blank" rel="noopener">Support us</a>
                <img src="/image/link.svg" alt="" class="object-contain w-4">
            </li>
        </ul>
    </div>
    <div class="block md:hidden z-20">
        <Hamburger bind:open --color="#ffffff" />
    </div>
    <div class="mobile-container z-[9] flex flex-col justify-between w-screen h-dvh bg-primary-dark px-8 pt-32 pb-8 {open ? "open" : ""}">
        <img src="/image/logo.svg" alt="">
        <ul class="hidden md:flex items-center justify-center gap-4">
            <li>
                <a href="/daily">Jouer</a>
            </li>
            <li>
                <a href="#playlist">Playlist</a>
            </li>
        </ul>
    </div>
</div>


<style lang="postcss">
    .navbar-container {
		@apply pt-5 flex justify-start md:justify-center items-center md:relative w-full fixed bg-[#0C0B0B];
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
        @apply text-base font-bold p-2 text-secondary-lightGrey;
    }
</style>