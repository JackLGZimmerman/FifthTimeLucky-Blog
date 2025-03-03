<script>
	let { initial } = $props();
</script>

<div class="group flex items-center space-x-2">
	<span
		class="rounded-lg border border-gray-500 bg-white px-2 py-0.5 font-spiegel text-[11px] font-bold text-gray-500 opacity-100 transition-opacity duration-1000 hover:opacity-75"
		>Initial</span
	>

	<div class="w-full rounded-md border border-gray-200 p-4">
		<p class="text-[11px]">{initial}</p>
	</div>
</div>
