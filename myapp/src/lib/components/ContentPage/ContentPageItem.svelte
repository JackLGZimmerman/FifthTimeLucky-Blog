<script lang="ts">
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import ContentPageItem from './ContentPageItem.svelte';

	let { item, level } = $props();

	let expandedStates = $state({} as Record<number, boolean>);
</script>

<ol class="flex flex-col gap-1 font-spiegel text-[11px]">
	{#each item as child, i (child)}
		<li>
			<button
				type="button"
				onclick={() => (expandedStates = { ...expandedStates, [i]: !expandedStates[i] })}
				class="group flex w-full items-center rounded py-1 px-2.5 text-left hover:bg-blue-50"
				class:bg-gray-100={expandedStates[i]}
				title={child.title}
				aria-label={child.title}
			>
				<div class="flex shrink-0 pl-1" style="padding-left: {level * 0.5}rem">
					{#if child.children.length > 0}
						<AngleDownOutline
							class={`h-3 w-3 transition-transform duration-300 group-hover:text-blue-500 ${expandedStates[i] ? 'rotate-180 text-blue-500' : ''}`}
						/>
					{:else}
						<span class="block h-3 w-3"></span>
					{/if}
				</div>
				<span
					class="ml-2 truncate text-ellipsis group-hover:text-blue-500"
					class:text-blue-500={expandedStates[i]}
				>
					{child.title}
				</span>
			</button>
		</li>
		{#if child.children.length > 0 && expandedStates[i]}
			<ContentPageItem item={child.children} level={level + 1} />
		{/if}
	{/each}
</ol>
