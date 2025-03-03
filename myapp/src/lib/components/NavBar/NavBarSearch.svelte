<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { modalStore } from '$lib/stores/ModalStore.svelte';
</script>

<IconButton
	Icon={SearchOutline}
	variant="outline"
	title="Search Articles"
	onclick={() => modalStore.updateModal('signout')}
/>
