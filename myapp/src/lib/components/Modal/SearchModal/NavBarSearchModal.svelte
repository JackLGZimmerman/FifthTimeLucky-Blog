<script lang="ts">
	import { SearchOutline, EnvelopeSolid, FileOutline } from 'flowbite-svelte-icons';

	// Filters from the screenshot: People, Email, Document, Folder, Action
	let filters = ['People', 'Email', 'Document', 'Folder', 'Action'];

	// Results array, each entry is one category with total count & items
	let results = [
		{
			category: 'Emails',
			total: 15,
			items: [
				{ title: 'Dribbble Work Inquiry', userOrFolder: '@jenna.w', date: '16 Feb' },
				{ title: 'Dribbble Work Inquiry', userOrFolder: '@bajetto', date: '4 Feb' },
			],
		},
		{
			category: 'Documents',
			total: 3,
			items: [
				{ title: 'Dribbble invoice.pdf', userOrFolder: 'Work', date: '16 Feb' },
				{
					title: 'Moving and dribbling tutorial.mp4',
					userOrFolder: 'Personal/Sport',
					date: '16 Feb',
				},
			],
		},
	];

	function getItemIcon(category: string) {
		switch (category.toLowerCase()) {
			case 'emails':
				return EnvelopeSolid;
			case 'documents':
				return FileOutline;
			default:
				return FileOutline;
		}
	}
</script>

<!-- Main container -->
<div class="flex w-80 flex-col rounded-lg bg-white">
	<!-- Search bar -->
	<div class="flex w-full items-center border-b border-slate-200 px-4 py-1">
		<SearchOutline size="xs" />
		<input
			type="text"
			class=" w-full border-none bg-transparent font-spiegel text-xs font-bold focus:outline-none focus:ring-0"
			placeholder="Search for ‘Dribb’..."
		/>
		<div class="flex rounded-md border p-1 text-[9px]">ESC</div>
	</div>

	<!-- Body -->
	<div class="flex h-60 flex-col px-4 pt-2">
		<!-- Filters -->
		<div class="flex flex-col space-y-1.5 font-spiegel">
			<h2 class="font-spiegel text-[11px] text-gray-400">What are you looking for?</h2>
			<ol class="flex gap-1">
				{#each filters as filter (filter)}
					<li
						class="flex cursor-pointer whitespace-nowrap rounded-xl bg-gray-100 px-2 py-0.5 text-[10px] font-bold hover:bg-black hover:text-white"
					>
						{filter}
					</li>
				{/each}
			</ol>
		</div>

		<!-- Results List -->
		<div
			class="hide-scrollbar mt-2 flex h-full w-full flex-col overflow-y-auto font-spiegel text-sm text-gray-500"
		>
			{#if !results.length}
				<p class="text-center text-gray-400">No results found...</p>
			{:else}
				<!-- Each category, e.g. Emails, Documents, etc. -->
				{#each results as result}
					<!-- Category Heading: e.g. Emails (15) + See All -->
					<div class="flex w-full items-center justify-between text-[10px] font-bold">
						<div class="flex items-center space-x-2">
							<span>{result.category}</span>
							<span
								class="flex h-4 items-center justify-center rounded-md bg-gray-100 px-1.5 text-[9px] font-bold text-gray-500"
							>
								{result.total}
							</span>
						</div>
						<span class="cursor-pointer text-[10px] text-blue-500 hover:text-blue-400">See All</span
						>
					</div>

					<!-- Items under that category -->
					<ol class="ml-2 mt-1 flex flex-col space-y-1">
						{#each result.items as item}
							<li
								class="flex cursor-pointer items-start gap-3 rounded-md px-2 pb-1 pt-2 text-[10px] text-gray-600 hover:bg-gray-100"
							>
								<div class="flex items-center justify-center rounded-md bg-gray-200 p-1">
									<svelte:component
										this={getItemIcon(result.category)}
										class="rounded-md bg-gray-100 text-gray-500"
										size="xs"
									/>
								</div>

								<div class="flex flex-col">
									<div class="text-xs font-bold">{item.title}</div>
									<div class="text-[9px] text-gray-400">
										{item.userOrFolder} • {item.date}
									</div>
								</div>
							</li>
						{/each}
					</ol>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Footer -->
	<div class="flex w-full items-center border-t border-slate-200 px-6 py-4"></div>
</div>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
