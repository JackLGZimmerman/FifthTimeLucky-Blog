<script lang="ts">
	import type { WebsiteContentType } from '$lib/types';
	import ContentPageItem from './ContentPageItem.svelte';
	const navigationData: WebsiteContentType[] = [
		{
			title: 'Draft',
			type: 'document',
			children: [
				{
					title: 'Core Drafting Types',
					type: 'document',
					children: [
						{ title: 'Control Drafts', type: 'type', children: [] },
						{ title: 'Engage Drafts', type: 'type', children: [] },
						{ title: 'Scaling Drafts', type: 'type', children: [] },
					],
				},
				{
					title: 'Pillars of Draft',
					type: 'document',
					children: [
						{ title: 'META / Off-META', type: 'code', children: [] },
						{ title: 'Flexibility', type: 'code', children: [] },
						{ title: 'Comfort', type: 'code', children: [] },
						{ title: 'Counters', type: 'code', children: [] },
						{ title: 'Combinations', type: 'code', children: [] },
					],
				},
				{
					title: 'Player Competancies & Feedback',
					type: 'document',
					children: [
						{ title: 'META / Off-META', type: 'code', children: [] },
						{ title: 'Flexibility', type: 'code', children: [] },
						{ title: 'Comfort', type: 'code', children: [] },
						{ title: 'Counters', type: 'code', children: [] },
						{ title: 'Combinations', type: 'code', children: [] },
					],
				},
				{
					title: 'Preparing Drafts',
					type: 'document',
					children: [
						{ title: 'Player Scouting', type: 'code', children: [] },
						{ title: 'Strategy Planning', type: 'code', children: [] },
					],
				},
				{
					title: 'Executing Drafts',
					type: 'document',
					children: [
						{ title: 'Pre-game', type: 'code', children: [] },
						{ title: 'In-game', type: 'code', children: [] },
					],
				},
				{
					title: 'Evaluation',
					type: 'document',
					children: [
						{ title: 'Pre-game Analysis', type: 'code', children: [] },
						{ title: 'Post-game Review', type: 'code', children: [] },
					],
				},
			],
		},
		{
			title: 'Coaching',
			type: 'document',
			children: [],
		},
		{
			title: 'Communication',
			type: 'document',
			children: [],
		},
		{
			title: 'Macro',
			type: 'document',
			children: [],
		},
		{
			title: 'Micro',
			type: 'document',
			children: [],
		},
		{
			title: 'Analytics',
			type: 'document',
			children: [],
		},
		{
			title: 'Performance Psychology',
			type: 'document',
			children: [],
		},
		{
			title: 'Health and Well-being',
			type: 'document',
			children: [],
		},
	];
</script>

<!-- Lets make this an entire column that occupies the padding space -->
<nav class="flex text-xl flex-col pl-8 w-60 h-full bg-white rounded-md">
	<div class="flex mb-2">
		<h2 class="flex font-spiegel font-bold">Articles</h2>
	</div>
	<ContentPageItem item={navigationData} level={0}/>	
</nav>
