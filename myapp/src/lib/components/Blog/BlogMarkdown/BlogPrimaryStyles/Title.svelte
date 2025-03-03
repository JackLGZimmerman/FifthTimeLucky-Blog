<script lang="ts">
	let {
		level,
		text,
		id = undefined,
	} = $props() as { level: 1 | 2 | 3 | 4 | 5; text: string; id?: string };
</script>

<svelte:element
	this={`h${level}`}
	{id}
	class="mb-2 text-{6 - level}xl truncate font-bold text-black"
	data-heading="true"
>
    {text}
</svelte:element>

