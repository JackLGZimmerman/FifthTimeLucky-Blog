<script lang="ts">
	let { items, ordered = false } = $props() as {
		items: [string | any, string | any][];
		ordered?: boolean;
	};
</script>

<dl class="my-1 pl-8">
	<svelte:element this={ordered ? 'ol' : 'ul'} class="list-none">
		{#each items as [title, content], index}
			<li class="relative mb-1 text-Grey3">
				<span class="absolute -left-5 select-none text-black" aria-hidden="true">
					{ordered ? `${index + 1}.` : '•'}
				</span>
				<dt class="inline {content ? 'font-bold' : ''}">{title}</dt>
				{#if content}
					<span class="mr-1">:</span>
					<dd class="inline">{content}</dd>
				{/if}
			</li>
		{/each}
	</svelte:element>
</dl>
