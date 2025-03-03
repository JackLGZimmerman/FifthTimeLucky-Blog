<script lang="ts">
	import { page } from '$app/state';
	import { AngleRightOutline } from 'flowbite-svelte-icons';
	
    const splitPath = page.url.pathname.split('/').splice(1);
    let routes = $state(Object.values(splitPath));
</script>

<nav
	aria-label="breadcrumb"
	class="flex items-center bg-white pl-[25%] ml-2 pt-2 pb-3"
>
	<ol class="flex items-center font-spiegel text-[11px] space-x-2">
		{#each routes as route, idx (route)}
			<li class="flex items-center">
                {#if idx === routes.length - 1}
                    <span class="text-gray-500">{route}</span>
                {:else}
                    <a 
                        href={'/' + routes.slice(0, idx + 1).join('/')}
                        class="hover:text-blue-500 text-gray-500"
                    >
                        {route}
                    </a>
                {/if}
			</li>
            {#if idx < routes.length - 1}
                <AngleRightOutline class="h-3 w-3 text-gray-500" />
            {/if}
		{/each}
	</ol>
</nav>
