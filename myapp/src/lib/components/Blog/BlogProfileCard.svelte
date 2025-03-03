<script lang="ts">
	export let image = 'https://picsum.photos/150';
	export let name = 'Placeholder Name';
	export let created = 'Jan 1, 2023';
	export let lastEdit = 'Jan 2, 2023';
	export let isMajor = false;
	export let size: 'large' | 'medium' | 'small' = 'medium';

	const sizeClasses = {
		large: {
			img: 'w-16 h-16 rounded-full hover:ring-2 hover:ring-blue-600/60', // 64px
			text: 'text-xl font-semibold',
		},
		medium: {
			img: 'w-8 h-8 rounded-full hover:ring-2 hover:ring-blue-600/60', // 48px
			text: 'text-xs font-semibold',
		},
		small: {
			img: 'w-8 h-8 rounded-full hover:ring-2 hover:ring-blue-600/60', // 32px
			text: 'text-sm font-semibold',
		},
	};

	$: imgClasses = sizeClasses[size].img;
	$: textClasses = sizeClasses[size].text;
</script>

<button class="flex items-center space-x-4 text-left font-spiegel">
	<img src={image} alt={name} class={`${imgClasses} flex object-cover flex-shrink-0`} />
	<div class="flex flex-col flex-1 min-w-0">
		<div class="flex space-x-2">
			<span class={`${textClasses} truncate`}>{name}</span>
			{#if isMajor}
				<span class="text-xs font-medium text-orange-500">Major</span>
			{/if}
		</div>
		{#if created && size !== 'medium'}
			<span class="text-[10px] truncate">
				Created: <span class="font-bold">{created}</span>
			</span>
		{/if}
		{#if lastEdit}
			<span class="text-[10px] truncate">
				Last edit: <span class="font-bold">{lastEdit}</span>
			</span>
		{/if}
	</div>
</button>
