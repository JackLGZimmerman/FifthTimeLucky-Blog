<script lang="ts">
    type NoteType = 'info' | 'warning' | 'danger' | 'question' | 'general';
    
    let { text, type } = $props() as { text: string; type: NoteType };

    const typeStyles: Record<NoteType, string> = {
        general: 'bg-gray-500/10',
        info: 'bg-blue-500/10',
        warning: 'bg-orange-500/10',
        danger: 'bg-red-500/10',
        question: 'bg-violet-500/10'
    };
</script>

<aside class="{typeStyles[type]} rounded-md px-6 py-3">
    <p class="prose prose-base text-Grey3">{text}</p>
</aside>
