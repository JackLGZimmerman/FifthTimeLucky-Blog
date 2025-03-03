<script lang="ts">
	let { dropdown, ariaLabel = '' } = $props();
</script>

<div
	role="menu"
	aria-label={ariaLabel}
	class="absolute left-0 top-full flex w-60 flex-col gap-1 border border-htBlack/10 bg-white p-2"
>
	<dl>
		{#each dropdown as child}
			<div
				role="menuitem"
				class="group flex flex-col rounded p-2 font-spiegel hover:bg-blue-50 active:bg-blue-100"
			>
				<dt class="text-sm font-bold text-gray-500 group-hover:text-blue-500">
					{child.title}
				</dt>
				<dd class="m-0 text-[10px] leading-tight text-gray-500 group-hover:text-blue-500">
					{child.description}
				</dd>
			</div>
		{/each}
	</dl>
</div>
