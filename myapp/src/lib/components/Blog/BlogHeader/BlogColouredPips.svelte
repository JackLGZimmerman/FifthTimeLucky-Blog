<script lang="ts">
	const colourMapping: Record<string, string> = {
		Strategy: 'bg-blue-100 text-blue-500',
		Drafting: 'bg-green-100 text-green-500',
		Advanced: 'bg-purple-100 text-purple-500',
		'In Review': 'bg-yellow-100 text-yellow-500',
		Published: 'bg-green-100 text-green-500',
		Draft: 'bg-gray-100 text-gray-500',
		'Receiving Updates': 'bg-fuchsia-100 text-fuchsia-500',
	};
	let { name, space = 'px-2 py-0.5' } = $props();
</script>

<div class="flex items-center rounded-lg font-spiegel {space} text-[11px] {colourMapping[name]}">
	{name}
</div>
