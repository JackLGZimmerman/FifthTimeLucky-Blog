<script lang="ts">
	import BlogProfileCard from '../../BlogProfileCard.svelte';
	import { ClipboardListSolid } from 'flowbite-svelte-icons';
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import { AngleRightOutline } from 'flowbite-svelte-icons';
	import BlogVersionHistoryBaseInfo from './BlogVersionHistoryBaseInfo.svelte';
	import BlogInitialVersion from './BlogInitialVersion.svelte';
	import BlogUpdatedVersion from './BlogUpdatedVersion.svelte';
	const history = [
		{
			version: 'v1.3.2',
			name: 'John Doe',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			summary: 'Updated META strategy section with new patch changes',
			fullChanges: [
				{
					initial: 'Removed reference to outdated patch data in the introduction.',
					updated: 'Added references to the latest patch changes in the introduction.',
				},
				{
					initial: 'Removed old meta strategy approach details.',
					updated: 'Added new meta strategy approach with updated tips and guidance.',
				},
			],
			lastEdit: '12/10/24 at 7:00pm',
			statusChange: { from: 'In Review', to: 'Published' },
			stats: { views: 0, comments: 0 },
		},
		{
			version: 'v1.3.1',
			name: 'Jane Smith',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			summary: 'Fixed typos and improved readability',
			fullChanges: [
				{
					initial: 'Removed repeated wording in the second paragraph.',
					updated: 'Added clearer phrasing for the second paragraph.',
				},
				{
					initial: 'Removed old references to previous patch changes.',
					updated: 'Simplified references to current patch notes and updates.',
				},
			],
			lastEdit: '12/09/24 at 3:15pm',
			statusChange: { from: 'Draft', to: 'In Review' },
			stats: { views: 2543, comments: 29 },
		},
	];
	let changeLogs = history.reduce(
		(acc, item) => {
			acc[item.version] = false;
			return acc;
		},
		{} as Record<string, boolean>
	);
	let showVersionHistory = $state(false);
	let showFullChangeLogs = $state(changeLogs);
</script>

<div class="relative inline-block">
	<!-- Toggle button -->
	<button
		type="button"
		class="group flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1.5 font-spiegel text-xs hover:cursor-pointer hover:bg-blue-500/10"
		onclick={() => (showVersionHistory = !showVersionHistory)}
	>
		<ClipboardListSolid class="h-3 w-3 group-hover:text-blue-500" />
		<span class="flex group-hover:text-blue-500">Version History</span>
		<AngleDownOutline
			class="ml-1 h-3 w-3 group-hover:text-blue-500 {showVersionHistory
				? 'rotate-180 transition-transform'
				: ''}"
		/>
	</button>

	<!-- Dropdown menu -->
	{#if showVersionHistory}
		<ol
			role="menu"
			class="absolute left-0 top-full mt-1 flex w-[700px] flex-col gap-1 rounded-lg border border-gray-200 bg-white p-1 font-spiegel shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:border-gray-200"
		>
			{#each history as item (item.version)}
				<li class="flex space-x-4 divide-x divide-gray-200 rounded-md p-2 hover:bg-blue-50/70">
					<BlogProfileCard
						name={item.name}
						image={item.image}
						lastEdit={item.lastEdit}
						size="medium"
					/>
					<div class="flex-1 flex-col space-y-1 pl-4">
						<BlogVersionHistoryBaseInfo {item} />
						<button
							type="button"
							onclick={() =>
								(showFullChangeLogs = {
									...showFullChangeLogs,
									[item.version]: !showFullChangeLogs[item.version],
								})}
							class="ml-1 flex items-center justify-start text-[11px] hover:text-blue-500"
						>
							<strong>Change Summary</strong>: {item.summary}
							<AngleRightOutline class="ml-1 h-3 w-3 transition-transform hover:translate-x-0.5" />
						</button>
					</div>
				</li>

				<!-- {#if showFullChangeLogs[item.version]}
					<li class="flex flex-col rounded-md p-2">
						{#each item.fullChanges as change, i}
							<div class="flex flex-col gap-2">
								<BlogInitialVersion initial={change.initial} />
								<BlogUpdatedVersion initial={change.initial} updated={change.updated} />
							</div>
							{#if i < item.fullChanges.length - 1}
								<hr class="my-2 border-gray-200" />
							{/if}
						{/each}
					</li>
				{/if} -->
			{/each}
		</ol>
	{/if}
</div>
