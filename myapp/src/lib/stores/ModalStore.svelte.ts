class Modal {
	modalType = $state<string | null>('');

	updateModal(modalType: string | null) {
		this.modalType = modalType;
	}
}

export const modalStore = new Modal();