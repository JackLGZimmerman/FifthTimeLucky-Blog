<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import WebBar from '$lib/components/WebBar/WebBar.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import type { LayoutProps } from './$types';
	import { sessionStore } from '$lib/stores/SessionStore.svelte';

	let { children, data }: LayoutProps = $props();
	sessionStore.updateSessionStore(data.session, data.user);
</script>

<WebBar />
<NavBar />
<Breadcrumb />

{#if import.meta.env.DEV}
	<div class="bg-gray-100 p-4 text-xs">
		<h4 class="font-bold">Session Debug:</h4>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>
{/if}

{@render children()}
