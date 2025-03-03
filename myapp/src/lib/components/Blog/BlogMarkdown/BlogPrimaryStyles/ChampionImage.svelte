<script>
    import Image from '$lib/components/Blog/BlogMarkdown/BlogPrimaryStyles/Image.svelte';
</script>



<!-- export const ChampionRoleImage: React.FC<{
    champion: string;
    role?: keyof typeof ROLE_MAP;
    caption?: string;
    url?: string;
}> = ({ champion, role, caption, url }) => {
    const { champions } = useChampions();
    const championData = champions.find((c) => c.basicName === champion);

    const content = (
        <div className={`relative h-full w-full ${url ? 'transition-transform hover:scale-105 hover:shadow-lg' : ''}`}>
            <div
                className={`pointer-events-none absolute inset-0 z-10 rounded-xl bg-black opacity-30 ${url ? 'transition-opacity hover:opacity-20' : ''}`}
            />
            {role && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <div className="mx-auto h-[60%] w-[60%]">
                        {React.createElement(icons[ROLE_MAP[role]], {
                            className: 'w-full h-full text-MetalGold1 opacity-70',
                        })}
                    </div>
                </div>
            )}
            <Image
                src={championData?.imgs.tile || ''}
                alt={`${champion}${role ? ` ${role}` : ''}`}
                aspect="square"
                caption={caption}
            />
        </div>
    );

    return url ? <A link={url}>{content}</A> : content;
}; -->