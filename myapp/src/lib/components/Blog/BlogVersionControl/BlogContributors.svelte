<script>
	import BlogProfileCard from '../BlogProfileCard.svelte';
	import { UsersGroupSolid } from 'flowbite-svelte-icons';
	import { AngleDownOutline } from 'flowbite-svelte-icons';

	const contributors = [
		{
			name: 'Alice Johnson',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
			lastEdit: '12/01/24 at 3:00pm',
			isMajor: true,
		},
		{
			name: 'Bob Smith',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
			lastEdit: '11/30/24 at 1:45pm',
			isMajor: false,
		},
		{
			name: 'Carol White',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
			lastEdit: '11/29/24 at 10:30am',
			isMajor: true,
		},
	];

	let showContributors = $state(false);
</script>

<button
	class="relative group flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1.5 font-spiegel text-xs hover:cursor-pointer hover:bg-blue-500/10"
	onclick={() => {
		showContributors = !showContributors;
	}}
>
	<UsersGroupSolid class="h-3 w-3 group-hover:text-blue-500" />
	<span class="flex group-hover:text-blue-500">Contibutors (3)</span>
	<AngleDownOutline
		class="ml-1 h-3 w-3 group-hover:text-blue-500 {showContributors
			? 'rotate-180 transition-transform'
			: ''}"
	/>
	{#if showContributors}
		<ol class="absolute flex top-full left-0 mt-1 p-1 bg-white border-gray-200 w-60 border rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] flex-col gap-1 font-spiegel">
			{#each contributors as {name, image, lastEdit, isMajor} (name)}
				<li class="flex p-2 hover:bg-gray-100 rounded-md">
					<BlogProfileCard {name} {image} {lastEdit} {isMajor} size="medium" />
				</li>
			{/each}
		</ol>
	{/if}
</button>
