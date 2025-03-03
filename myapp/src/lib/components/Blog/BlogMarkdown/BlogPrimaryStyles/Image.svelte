<script>
	let {
		src = 'https://via.placeholder.com/800x400',
		alt = 'Placeholder Image',
		href = '',
		caption = '',
	} = $props();
</script>

<figure class="my-4 inline-block text-center">
	{#if href}
		<a
			{href}
			class="group relative inline-block overflow-hidden"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				class="block h-auto w-full transform transition-transform duration-300
               group-hover:scale-105 group-hover:shadow-lg"
				{src}
				{alt}
				loading="lazy"
			/>
		</a>
	{:else}
		<img
			class="block h-auto w-full transform transition-transform duration-300
             hover:scale-105 hover:shadow-lg"
			{src}
			{alt}
			loading="lazy"
		/>
	{/if}

	{#if caption}
		<figcaption class="mt-1 text-sm text-gray-600">
			{caption}
		</figcaption>
	{/if}
</figure>
