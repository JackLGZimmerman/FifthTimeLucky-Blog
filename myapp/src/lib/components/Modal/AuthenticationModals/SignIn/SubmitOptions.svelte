<script>
	let { allowSubmit, text } = $props();
	const providers = [
		{ title: 'Google', icon: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' },
		{
			title: 'Facebook',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
		},
		{ title: 'X', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg' },
		{
			title: 'Instagram',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
		},
		{
			title: 'Riot Games',
			icon: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Riot_Games_2022.svg',
		},
	];
</script>

<div class="flex flex-col gap-2 pt-4 text-[9px]">
	<button
		type="submit"
		class={[
			'rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-400',
			{ 'cursor-not-allowed grayscale': !allowSubmit },
		]}
		disabled={!allowSubmit}>{text}</button
	>
	<div class="flex gap-1">
		{#each providers as provider}
			<button
				type="button"
				class="flex flex-1 items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500"
				aria-label={`Sign in with ${provider.title}`}
				title={provider.title}
			>
				<img src={provider.icon} alt={provider.title} class="w-4" />
			</button>
		{/each}
	</div>
</div>
