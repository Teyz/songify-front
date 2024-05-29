<script lang="ts">
	import { HintTypeToString } from "$lib/constants/hint";
	import Countdown from "./Countdown.svelte";

    export let hint: string;
    export let hintType: number;
</script>

<div class="hint-container">
    <div class="flex items-center gap-3">
        <div class="hint-icon">
            <img src="/image/hint.svg" alt="hint" />
        </div>
        <p>{HintTypeToString(hintType, hint)}</p>
    </div>
    <div class="countdown-container">
        <Countdown />
    </div>
</div>

<style lang="postcss">
    .hint-container {
       @apply flex items-center justify-between p-6 bg-white rounded-lg;
    }

    .hint-icon {
        @apply rounded-[4px] bg-black bg-opacity-10 flex justify-center items-center p-4;
    }
    .countdown-container {
      @apply rounded-[4px] bg-black bg-opacity-10 flex justify-center items-center text-black text-base font-medium w-11 h-11;
    }  
</style>