<script>
    let { handleBackdropClick, handleBackdropKeydown, name, children } = $props();
</script>

<div
	class="fixed inset-0 z-50 m-0 flex items-center justify-center bg-black/50 p-0"
	tabindex="0"
	role="button"
	aria-label="Close {name} modal"
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKeydown}
>
	<div class="relative" role="presentation" onclick={(e) => e.stopPropagation()}>
		{@render children()}
	</div>
</div>
