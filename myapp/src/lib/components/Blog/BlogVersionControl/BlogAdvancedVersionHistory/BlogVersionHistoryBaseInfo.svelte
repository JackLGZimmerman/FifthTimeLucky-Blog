<script>
	import BlogColouredPips from '../../BlogHeader/BlogColouredPips.svelte';
	import { AngleRightOutline } from 'flowbite-svelte-icons';

	let { item } = $props();
</script>

<div class="flex h-6 items-center justify-between space-x-4 font-spiegel text-[11px]">
	{#if item.statusChange}
		<div class="flex items-center space-x-1.5">
			<BlogColouredPips name={item.statusChange.from} />
			<AngleRightOutline class="h-3 w-3" />
			<BlogColouredPips name={item.statusChange.to} />
		</div>
	{/if}
	<div class="flex items-center space-x-2 pl-4">
		<span class="font-semibold">{item.version}</span>
		<span>•</span>
		<span class="font-semibold">{item.stats.views} views</span>
		<span>•</span>
		<span class="font-semibold">{item.stats.comments} comments</span>
	</div>
</div>

