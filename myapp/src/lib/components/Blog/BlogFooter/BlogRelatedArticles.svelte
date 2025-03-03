<script lang="ts">
	// Define the article type and export articles list
	import BlogColouredPips from '../BlogHeader/BlogColouredPips.svelte';
	import BlogProfileCard from '../BlogProfileCard.svelte';
	const RELATED_ARTICLES = [
		{
			title: 'Counter-Picking Strategy',
			subtitle: 'Learn when and how to effectively counter-pick',
			image: 'https://images.unsplash.com/photo-1234',
			author: {
				name: 'Jane Smith',
				image:
					'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
			readingTime: '4m',
			tags: ['Strategy', 'Advanced'],
		},
		{
			title: 'Early Game Tactics',
			subtitle: 'Mastering the first 10 minutes',
			image: 'https://images.unsplash.com/photo-9012',
			author: {
				name: 'Mike Johnson',
				image:
					'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
			readingTime: '5m',
			tags: ['Strategy', 'Advanced'],
		},
		{
			title: 'Early Game Tactics',
			subtitle: 'Mastering the first 10 minutes',
			image: 'https://images.unsplash.com/photo-9012',
			author: {
				name: 'Mike Johnson',
				image:
					'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
			readingTime: '5m',
			tags: ['Strategy', 'Advanced'],
		},
	];
</script>

<section class="font-spiegel">
	<h2 class="mb-4 text-2xl font-bold">Related Articles</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each RELATED_ARTICLES as article, index}
			<div class="relative flex rounded-lg border p-4 transition-shadow hover:shadow-md">
				<div class="flex w-full flex-col justify-between space-y-3">
					<div>
						<h3 class="text-xl font-bold">{article.title}</h3>
						<p class="text-[11px] text-gray-600">{article.subtitle}</p>
					</div>
					<div class="flex items-center justify-between space-x-2">
						<BlogProfileCard />
						<div class="flex flex-wrap justify-center gap-1">
							{#each article.tags as tag, tagIndex}
								<BlogColouredPips name={tag}/>
							{/each}
						</div>
					</div>
				</div>
				<span class="absolute right-4 top-2 self-end text-xs text-gray-500"
					>{article.readingTime} read</span
				>
			</div>
		{/each}
	</div>
</section>
