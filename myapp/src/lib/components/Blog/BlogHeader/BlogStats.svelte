<script lang="ts">
    import BlogStatsTooltip from './BlogStatsTooltip.svelte';
	
	const stats = [
		{
			type: 'popularity',
			percentile: 0,
			position: 1,
			value: 3247,
			tooltip: 'Top 1% in Popularity (3,247 Views)',
		},
		{
			type: 'interaction',
			percentile: 25,
			position: 34,
			value: 42,
			tooltip: 'Top 25% in Interactions (42 Comments)',
		},
	];

	function getStatColor(percentile: number, position: number) {
		if (position === 1) return 'bg-MagicBlue2'; // Special case for #1 position
		if (percentile >= 90) return 'bg-orange-500'; // Top 10%
		if (percentile >= 75) return 'bg-purple-500'; // Top 25%
		if (percentile >= 50) return 'bg-blue-500'; // Top 50%
		if (percentile >= 0) return 'bg-gray-500'; // Bottom 50%
		return 'bg-gray-500'; // Fallback for invalid values
	}

	let statStates: Record<string, boolean> = stats.reduce((acc: Record<string, boolean>, { type }) => {
		acc[type] = false;
		return acc;
	}, {});

    let showTooltip = $state(statStates);
</script>

<div class="flex gap-2">
	{#each stats as { type, percentile, position, value, tooltip } (type)}
		<div class="relative">
			<button
				aria-label={tooltip}
				onmouseover={() => { showTooltip = { ...showTooltip, [type]: true } }}
				onfocus={() => { showTooltip = { ...showTooltip, [type]: true } }}
				onmouseleave={() => { showTooltip = { ...showTooltip, [type]: false } }}
				onblur={() => { showTooltip = { ...showTooltip, [type]: false } }}
				class="flex items-center rounded-full {getStatColor(percentile, position)} h-3 w-3 transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-blue-500"
			>
			</button>
			{#if showTooltip[type]}
				<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
					<BlogStatsTooltip {tooltip} progress={percentile} color={getStatColor(percentile, position)}/>
				</div>
			{/if}
		</div>
	{/each}
</div>
