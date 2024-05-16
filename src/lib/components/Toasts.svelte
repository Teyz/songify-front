<script>
// @ts-nocheck

  let data = {};
</script>

<div class="my-toast {data.type}">
  <button on:click={data.remove}>Close</button>
  <p class="title">{data.title}</p>
  <hr>
  <p class="description">{data.description}</p>
  <div>
    <slot/>
  </div>
</div>

<style lang="postcss">
    .my-toast {
        @apply bg-primary text-white p-4 rounded-lg;
    }
</style>

