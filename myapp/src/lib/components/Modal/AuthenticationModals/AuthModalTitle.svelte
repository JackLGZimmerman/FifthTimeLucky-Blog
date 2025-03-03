<script>
    let { title, subtitle } = $props();
</script>

<div class="flex flex-col items-center pb-4 font-spiegel text-[10px]">
    <h1 class="flex text-xs font-bold">{title}</h1>
    <h3 class="flex text-[9px] text-gray-400">{subtitle}</h3>
</div>