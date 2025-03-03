<script lang="ts">
    import WebBarSettings from './WebBarSettings.svelte';
</script>

<header class="flex h-[35px] border-b border-black/10 bg-white px-2">
	<nav
		aria-label="Main navigation"
		class="relative flex w-full items-center font-spiegel text-base font-semibold text-black"
	>
		<!-- Left side: Logo -->
		<a href="/" class="ml-2 shrink-0">
			<span class="font-beaufort text-xl font-[900] tracking-tight">FIFTH TIME LUCKY</span>
		</a>

		<!-- Right side: Actions -->
		<div class="flex shrink-0 items-center gap-2 ml-auto h-full">
			<WebBarSettings />
		</div>
	</nav>
</header>
