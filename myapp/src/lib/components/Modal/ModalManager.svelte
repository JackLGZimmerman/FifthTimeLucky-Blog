<script lang="ts">
	import { modalStore } from '$lib/stores/ModalStore.svelte';
	import NavBarSearchModal from './SearchModal/NavBarSearchModal.svelte';
	import SignInForm from '$lib/components/Form/SignInForm.svelte';
	import SignUpForm from '$lib/components/Form/SignUpForm.svelte';
	import ModalContainer from '$lib/components/Modal/ModalContainer.svelte';
	import Portal from 'svelte-portal';

	function handleBackdropClick() {
		modalStore.updateModal(null);
	}

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			modalStore.updateModal(null);
		}
	}
</script>

<Portal target="body">
	{#if modalStore.modalType === 'search'}
		<ModalContainer {handleBackdropClick} {handleBackdropKeydown} name="search">
			<NavBarSearchModal />
		</ModalContainer>
	{:else if modalStore.modalType === 'signin'}
		<ModalContainer {handleBackdropClick} {handleBackdropKeydown} name="sign-in">
			<SignInForm />
		</ModalContainer>
	{:else if modalStore.modalType === 'signup'}
		<ModalContainer {handleBackdropClick} {handleBackdropKeydown} name="sign-up">
			<SignUpForm />
		</ModalContainer>
	{:else}
		<!-- No Active Modal -->
	{/if}
</Portal>
