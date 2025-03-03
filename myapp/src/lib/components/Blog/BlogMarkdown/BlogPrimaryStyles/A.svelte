<script lang="ts">
	let { text = '', link } = $props() as {
		text?: string;
		link: string;
	};
</script>

<mark class="bg-transparent">
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		class={link
			? 'block cursor-pointer transition-all hover:bg-gray-50 hover:shadow-md'
			: 'cursor-pointer text-blue-500 hover:underline'}
		aria-label="Opens in new tab: {link}"
	>
		{text}
	</a>
</mark>
