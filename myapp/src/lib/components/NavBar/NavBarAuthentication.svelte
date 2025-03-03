<script lang="ts">
	import { modalStore } from '$lib/stores/ModalStore.svelte';
	import { sessionStore } from '$lib/stores/SessionStore.svelte';
	import { apiFetch } from '$lib/features/index';

	async function signOut() {
		const response = await apiFetch('/api/auth/signout', {
			method: 'POST',
		});
	}

</script>

<div class="font-spiegel flex gap-1 text-[12px]">
	{#if sessionStore.isAuthenticated()}
		<!-- Show when user is authenticated -->
		<form onsubmit={signOut}>
			<button
				class="font-spiegel flex rounded-sm bg-gray-50 px-3 py-2 font-bold text-blue-500 hover:bg-blue-50 hover:text-blue-400"
				type="submit"
			>
				Sign Out
			</button>
		</form>
	{:else}
		<!-- Show when user is not authenticated -->
		<button
			class="font-spiegel flex rounded-sm bg-gray-50 px-3 py-2 font-bold text-blue-500 hover:bg-blue-50 hover:text-blue-400"
			onclick={() => modalStore.updateModal('signin')}
		>
			Sign In
		</button>

		<button
			class="font-spiegel flex rounded-sm bg-gray-50 px-3 py-2 font-bold text-blue-500 hover:bg-blue-50 hover:text-blue-400"
			onclick={() => modalStore.updateModal('signup')}
		>
			Sign Up
		</button>
	{/if}
</div>
