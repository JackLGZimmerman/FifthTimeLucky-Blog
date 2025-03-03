<script>
	import { modalType } from '$lib/stores/ModalStore.svelte';
	let { text, type } = $props();
</script>

<button
	onclick={() => ($modalType = type)}
	class="flex items-center justify-center rounded-md bg-slate-600 px-2 py-1 text-gray-100 hover:bg-htBlack"
>
	{text}
</button>
