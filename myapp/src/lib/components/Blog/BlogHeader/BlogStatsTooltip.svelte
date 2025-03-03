<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	let { tooltip, progress, color } = $props();
</script>


<div class="relative flex flex-col items-center">
	<div class="flex w-60 flex-col rounded-lg px-2 py-1.5 space-y-1 text-white {color}">
		<span class="flex text-[9px]">
			{tooltip}
		</span>
		<Progressbar
			progress={100 - progress}
			animate
			tweenDuration={1000}
			progressClass="bg-white"
			divClass="w-full bg-gray-300 rounded-full dark:bg-black"
		/>
	</div>
</div>
