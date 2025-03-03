<script lang="ts">
	import NavBarDropdown from '$lib/components/Dropdown.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let Navigation: NavigationOptionsType[] = [
		{
			title: 'Drafting',
			dropdown: [
				{
					title: 'Theory',
					description:
						'Understand the foundations of draft, including the technique and the choices you make',
				},
				{
					title: 'Thematics',
					description: 'Get insight to the primary themes of champion design and how to use them',
				},
				{
					title: 'Champion Classes',
					description:
						'Discover how to interpret the nuances behind champion identity—from identifying them to understanding how they relate to each other',
				},
				{
					title: 'Champion Contribution',
					description:
						'How do the qualities of the champions you pick affect your chances to win the game',
				},
				{
					title: 'Team Contribution',
					description:
						'How does the tools your team has access to affect your chances to win the game',
				},
				{
					title: 'Champion Data',
					description:
						"Access the truth behind the data, what works, what doesn't and what you might have missed",
				},
			],
		},
		{
			title: 'Case Studies',
			dropdown: [
				{
					title: 'Case Study 1',
					description: 'A brief overview of the topic',
				},
				{
					title: 'Case Study 2',
					description: 'A brief overview of the topic',
				},
				{
					title: 'Case Study 3',
					description: 'A brief overview of the topic',
				},
				{
					title: 'Case Study 4',
					description: 'A brief overview of the topic',
				},
			],
		},
		{
			title: 'Discussion',
			dropdown: [],
		},
	];

	let initialStates = Navigation.reduce(
		(acc, nav) => {
			acc[nav.title] = false;
			return acc;
		},
		{} as Record<string, boolean>
	);
	let openStates = $state(initialStates);

	function enhanceSignout() {
		return ({ form }) => {
			return async ({ result }) => {
				if (result.type === 'success') {
				}
			};
		};
	}
</script>

<nav class="flex-grow1 flex h-full justify-center" aria-label="Main navigation">
	<ul class="flex items-center">
		{#each Navigation as { title, dropdown } (title)}
			<li
				class="border-htBlack/10 relative h-full border-l px-8"
				onmouseenter={() => (openStates[title] = true)}
				onmouseleave={() => (openStates[title] = false)}
			>
				<a
					href={'/' + title}
					class="font-spiegel flex h-full items-center justify-center text-sm font-normal hover:text-blue-500"
					role="button"
					tabindex="0"
					aria-haspopup="true"
					aria-expanded={openStates[title]}
				>
					<span class="flex">{title}</span>
				</a>
				{#if openStates[title] && dropdown.length}
					<NavBarDropdown {dropdown} ariaLabel="submenu" />
				{/if}
			</li>
		{/each}

		{#if $page.data.user}
			<li class="border-htBlack/10 relative h-full border-l px-8">
				<form action="?/signout" method="POST" use:enhance={enhanceSignout} class="h-full">
					<button
						type="submit"
						class="font-spiegel flex h-full items-center justify-center text-sm font-normal hover:text-blue-500"
					>
						Sign Out
					</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>
