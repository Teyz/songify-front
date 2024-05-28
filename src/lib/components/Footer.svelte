<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer>
    <a href="https://x.com/Songify_game">
        <img src="/image/x.svg" alt="">
    </a>
    <img src="/image/logo.svg" alt="">
    <span class="text-[#a9a6aa] text-sm">@{currentYear} Songify</span>
</footer>

<style lang="postcss">
    footer {
        @apply flex justify-between items-center px-16 py-8;
    }
</style>