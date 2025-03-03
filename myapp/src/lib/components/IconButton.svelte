<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { IconSolid, IconOutline } from 'flowbite-svelte-icons';

	const config = {
		size: 'md' as 'md',
		class: 'text-htBlack',
		color: 'currentColor',
		role: 'img',
		strokeLinecap: 'round',
		strokeWidth: '2',
	};
	let { variant = 'solid', title, Icon, onclick } = $props();
</script>

<button
	{title}
	aria-label={title}
	class="flex items-center justify-center rounded-md p-1.5 hover:bg-htBlack/10"
	{onclick}
>
	{#if variant === 'solid'}
		<IconSolid {...config} {Icon} />
	{:else}
		<IconOutline {...config} {Icon} />
	{/if}
</button>
