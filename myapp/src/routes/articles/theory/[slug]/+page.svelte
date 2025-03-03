<script lang="ts">
	import BlogHeader from '$lib/components/Blog/BlogHeader/BlogHeader.svelte';
	import BlogFooter from '$lib/components/Blog/BlogFooter/BlogFooter.svelte';
	import ContentPage from '$lib/components/ContentPage/ContentPage.svelte';
	import BlogCanvas from '$lib/components/Blog/BlogCanvas/BlogCanvas.svelte';
	import ModalManager from '$lib/components/Modal/ModalManager.svelte';
	
</script>

<main class="flex gap-8 pr-[20%]">
	<ContentPage />
	<div class="flex w-full flex-col gap-6">
		<BlogHeader />
		<BlogCanvas />
		<BlogFooter />
	</div>
</main>

<ModalManager />
