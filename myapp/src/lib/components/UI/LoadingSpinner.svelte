<script lang="ts">
	export let size = 'w-10 h-10';
	export let primaryColorClass = 'border-t-blue-500';
	export let secondaryColorClass = 'border-gray-200';
	export let borderWidth = 'border-4';
</script>

<div
	class={`inline-block ${size} rounded-full ${borderWidth} ${secondaryColorClass} ${primaryColorClass} animate-spin border-solid`}
></div>
