<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
    
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
  
  <div in:scale={{ delay: 0, duration: 250 }}>
    {countdown}
  </div>
