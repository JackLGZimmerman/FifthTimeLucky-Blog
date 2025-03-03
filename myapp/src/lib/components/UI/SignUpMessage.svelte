<script lang="ts">
	import { CloseCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	export let message: string;
	export let isFailure: boolean = false;
</script>

<div class="flex flex-col items-center justify-center p-2 text-center">
	{#if isFailure}
		<div class="text-red-500">
			<CloseCircleSolid class="h-12 w-12" />
		</div>
		<p class="font-spiegel mt-2 text-red-500">{message}</p>
	{:else}
		<div class="text-green-500">
			<CheckCircleSolid class="h-16 w-16" />
		</div>
		<h3 class="font-spiegel mt-2 text-xl font-bold text-green-600">Success!</h3>
		<p class="font-spiegel mt-1 text-green-600">{message}</p>
	{/if}
</div>
