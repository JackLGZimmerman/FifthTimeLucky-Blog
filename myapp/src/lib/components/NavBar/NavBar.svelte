<script lang="ts">
	import NavBarSearch from './NavBarSearch.svelte';
	import NavBarAuthentication from './NavBarAuthentication.svelte';
	import NavBarNavigation from './NavBarNavigation.svelte';
</script>

<header class="flex h-[50px] border-b border-black/10 bg-white pl-[25%] pr-2 items-center justify-center">
	<NavBarNavigation />

	<div class="ml-auto flex">
		<NavBarSearch />
		<div class="ml-2 flex shrink-0 border-l border-htBlack/10 py-0.5 pl-2">
			<NavBarAuthentication />
		</div>
	</div>
</header>
