<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    let countdown: number = 15;
    let countdownInterval: NodeJS.Timeout;
  
    onMount(() => {
      countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown === 0) clearInterval(countdownInterval);
      }, 1000);
    });
  
    onDestroy(() => {
      clearInterval(countdownInterval);
    });
  </script>
  
  <div class="countdown-container">
    {countdown}
  </div>

  <style lang="postcss">
    .countdown-container {
      @apply rounded-[4px] bg-black bg-opacity-10 flex justify-center items-center text-black text-base font-medium w-11 h-11;
    }    
  </style>