<script>
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	let showReadingStats = $state(false);
	const readingStats = {
		words: 1449,
		"reading time": "3m 20s",
	};
</script>

<div class="flex flex-col">
    <div class="relative flex rounded-md bg-white p-2 font-spiegel hover:bg-gray-50 text-[11px] shadow-md mb-2">
        <button
            class="flex h-full w-full items-center"
            onclick={() => {
                showReadingStats = !showReadingStats;
            }}
        >
            <strong>{readingStats["reading time"]}</strong>&nbsp;reading time
            <AngleDownOutline
                class="txt-gray-500 ml-2 h-3 w-3 {showReadingStats ? 'rotate-180 transition-transform' : ''}"
            />
        </button>
        {#if showReadingStats}
            <ol class="absolute top-full left-0 mt-1 flex py-2 bg-white border-gray-100 w-full border rounded-md shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] flex-col gap-1 font-spiegel">
                {#each Object.entries(readingStats) as [key, value] (key)}
                    <li class="flex justify-between py-1 flex-col text-[11px] border-l border-l-transparent hover:border-l-violet-500">
                        <span class="ml-2"><strong>{value}</strong>&nbsp;{key}</span>
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
</div>

