<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer>
    <a href="https://x.com/Songify_game">
        <img src="/image/x.svg" alt="" class="w-5 h-5 object-contain">
    </a>
    <img src="/image/logo.svg" alt="" class="object-contain w-36 h-8">
    <span class="text-[#a9a6aa] text-sm">@{currentYear} Songify</span>
</footer>

<style lang="postcss">
    footer {
        @apply flex justify-between items-center px-16 py-8;
    }
</style>