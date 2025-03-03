// import React, { useEffect, useState } from 'react';
// import { Champion } from '../../../../types/global.js';
// import icons from '@/assets/icons/icons.js';
// import { FaYoutube } from 'react-icons/fa';
// import { MdArrowRight } from 'react-icons/md';
// import { 
//     A, 
//     Text, 
//     List, 
//     ChampionRoleImage, 
//     useChampions, 
//     ROLE_MAP, 
//     Image, 
// } from './BlogPrimaryStyles.js';

// const UI = {
//     Badge: ({ text, colorClass }: { text: string; colorClass: string }) => (
//         <span className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}>{text}</span>
//     ),
// };

// export const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
// };

// export interface ChampionProfile {
//     name: string;
//     keyInfo: string;
//     reason: [string, string][];
// }

// export interface ChampionProfileCardProps {
//     name: string;
//     keyInfo: string;
//     children: React.ReactNode;
//     link?: string;
// }

// export const ChampionProfileCard: React.FC<ChampionProfileCardProps> = ({ name, keyInfo, children, link }) => {
//     const content = (
//         <article className="border-greyBlue/50 w-full rounded-xl border p-4 transition-all duration-200 hover:border-gray-400 hover:shadow-md">
//             <div className="flex items-stretch gap-5">
//                 <div className="relative h-24 w-24 flex-none overflow-hidden rounded-lg">
//                     <ChampionRoleImage champion={name} />
//                 </div>
//                 <div className="min-w-0 flex-1 space-y-2">
//                     <div className="flex items-center gap-3">
//                         <h3 className="text-lg font-bold text-gray-900">{name}</h3>
//                         <span
//                             title={keyInfo}
//                             className="truncate rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
//                         >
//                             {keyInfo}
//                         </span>
//                     </div>
//                     <div className="text-sm text-gray-600">{children}</div>
//                 </div>
//             </div>
//         </article>
//     );

//     return link ? <A link={link}>{content}</A> : content;
// };

// export const StrengthsNWeaknesses: React.FC<{
//     strengths: ChampionProfile[];
//     weaknesses: ChampionProfile[];
//     link?: string;
// }> = ({ strengths, weaknesses, link }) => {
//     const content = (
//         <section className="border-greyBlue/50 flex w-full rounded-xl border text-sm">
//             <section className="flex w-1/2 flex-col space-y-2 p-4">
//                 <h3 className="flex justify-center text-2xl font-bold">Strengths</h3>
//                 <div className="mx-auto h-[1px] w-4/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
//                 <div className="flex flex-col gap-2">
//                     {strengths.map((champion, index) => (
//                         <ChampionProfileCard 
//                             key={index} 
//                             name={champion.name}
//                             keyInfo={champion.keyInfo}
//                             link={`https://lolalytics.com/lol/${champion.name.toLowerCase()}/build/`}
//                         >
//                             <List items={champion.reason} />
//                         </ChampionProfileCard>
//                     ))}
//                 </div>
//             </section>
//             <section className="border-l-greyBlue/50 flex w-1/2 flex-col space-y-2 border-l p-4">
//                 <h3 className="flex justify-center text-2xl font-bold">Weaknesses</h3>
//                 <div className="mx-auto h-[1px] w-4/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
//                 <div className="flex flex-col gap-2">
//                     {weaknesses.map((champion, index) => (
//                         <ChampionProfileCard 
//                             key={index} 
//                             name={champion.name}
//                             keyInfo={champion.keyInfo}
//                             link={`https://lolalytics.com/lol/${champion.name.toLowerCase()}/build/`}
//                         >
//                             <List items={champion.reason} />
//                         </ChampionProfileCard>
//                     ))}
//                 </div>
//             </section>
//         </section>
//     );

//     return link ? <A link={link}>{content}</A> : content;
// };

// const INTERACTION_ASSETS = {
//     synergy: {
//         src: '/assets/interactions/synergy.svg',
//         alt: 'Champions working together',
//         description: 'Strong synergistic relationship',
//     },
//     counter: {
//         src: '/assets/interactions/counter.svg',
//         alt: 'Champion countering another',
//         description: 'Direct counter matchup',
//     },
//     combination: {
//         src: '/assets/interactions/combo.svg',
//         alt: 'Champions combining abilities',
//         description: 'Powerful ability combination',
//     },
//     duel: {
//         src: '/assets/interactions/duel.svg',
//         alt: 'Champions in a duel',
//         description: 'Notable 1v1 interaction',
//     },
// } as const;

// export interface ChampionXChampionProps {
//     champion1: {
//         name: string;
//         role: keyof typeof ROLE_MAP;
//     };
//     champion2: {
//         name: string;
//         role: keyof typeof ROLE_MAP;
//     };
//     type: keyof typeof INTERACTION_ASSETS;
//     link?: string;
// }

// export const ChampionXChampion: React.FC<ChampionXChampionProps> = ({ champion1, champion2, type, link }) => {
//     const interaction = INTERACTION_ASSETS[type];

//     return (
//         <article className="border-greyBlue/50 flex w-full items-center justify-between rounded-xl border p-4">
//             <div className="flex h-44 w-44 flex-col items-center">
//                 <ChampionRoleImage 
//                     champion={champion1.name} 
//                     role={champion1.role} 
//                     url={`https://lolalytics.com/lol/${champion1.name.toLowerCase()}/build/`}
//                 />
//             </div>
//             <figure className="flex flex-col items-center gap-2">
//                 <div className="flex h-32 w-32 items-center justify-center">
//                     <img 
//                         src={interaction.src} 
//                         alt={interaction.alt}
//                         className="max-h-full max-w-full object-contain"
//                     />
//                 </div>
//                 <figcaption className="text-center text-sm text-gray-600">
//                     {interaction.description}
//                 </figcaption>
//             </figure>
//             <div className="flex h-44 w-44 flex-col items-center">
//                 <ChampionRoleImage 
//                     champion={champion2.name} 
//                     role={champion2.role} 
//                     url={`https://lolalytics.com/lol/${champion2.name.toLowerCase()}/build/`}
//                 />
//             </div>
//         </article>
//     );
// };

// export const SectionedContainer: React.FC<{
//     sizes?: number[];
//     align?: ('start' | 'center' | 'end')[];
//     height?: number;
//     children: React.ReactNode[];
// }> = ({ sizes, align, height = 200, children }) => {
//     return (
//         <div
//             className="flex w-full gap-5"
//             style={{
//                 minHeight: `${height}px`,
//                 height: `${height}px`,
//             }}
//         >
//             {React.Children.map(children, (child, index) => (
//                 <div
//                     key={index}
//                     style={{
//                         width: sizes ? `${sizes[index]}%` : '100%',
//                         display: 'flex',
//                         alignItems: align?.[index] || 'flex-start',
//                         justifyContent: align?.[index] || 'flex-start',
//                     }}
//                     className="h-full rounded-xl"
//                 >
//                     {child}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export interface Draft {
//     name: string;
//     role: string;
// }

// export const ExampleDraft: React.FC<{ draft: Draft[] }> = ({ draft }) => {
//     return (
//         <div className={`grid h-full grid-cols-5 gap-2`}>
//             {draft.map(({ name, role }, idx) => {
//                 return (
//                     <div key={idx} className="relative aspect-square min-h-0">
//                         <ChampionRoleImage champion={name} role={role} />
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export function getYouTubeVideoId(url: string): string | null {
//     if (!url) return null;
//     const regExp = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regExp);
//     return match && match[1] ? match[1] : null;
// }

// export const useYouTubeVideoDetails = (url: string) => {
//     const [videoDetails, setVideoDetails] = useState<{ title: string; author: string } | null>(null);
//     const [videoId, setVideoId] = useState<string | null>(getYouTubeVideoId(url));

//     useEffect(() => {
//         if (!videoId) return;

//         fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setVideoDetails({
//                     title: data.title,
//                     author: data.author_name,
//                 });
//             })
//             .catch((error) => console.error('Failed to fetch video details:', error));
//     }, [videoId]);

//     return { videoDetails, videoId };
// };

// const STATIC_DATA = {
//     tags: [
//         { name: 'Strategy', color: 'bg-blue-100 text-blue-800' },
//         { name: 'Drafting', color: 'bg-green-100 text-green-800' },
//         { name: 'Advanced', color: 'bg-purple-100 text-purple-800' },
//     ],
// };

// export interface VideoContentProps {
//     url: string;
//     publishDate?: string;
//     caption?: string;
//     tags?: Array<{ name: string; color: string }>;
//     isShort?: boolean;
//     isExtra?: boolean;
// }

// export const VideoContent: React.FC<VideoContentProps> = ({
//     url,
//     publishDate = '', // Add default empty string
//     caption,
//     tags = [],
//     isShort,
//     isExtra
// }) => {
//     const [thumbnailError, setThumbnailError] = useState(false);
//     const { videoDetails, videoId } = useYouTubeVideoDetails(url);

//     if (!videoId) return <div className="text-red-500">Invalid YouTube URL</div>;

//     const thumbnailUrl = thumbnailError
//         ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//         : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

//     const content = isExtra ? (
//         <article className="border-greyBlue/50 flex items-center space-x-2 rounded-xl border px-4 py-2">
//             <FaYoutube className="text-xl text-red-600" />
//             <span className="text-md truncate font-bold">{videoDetails?.title || 'Loading...'}</span>
//             <span className="ml-auto text-sm text-gray-600">By {videoDetails?.author || 'Loading...'}</span>
//         </article>
//     ) : isShort ? (
//         <figure className="rounded-xl border p-4">
//             <div className="relative mb-2">
//                 <h2 className="text-md truncate pr-8 font-bold" id={`video-title-${videoId}`}>
//                     {videoDetails?.title || 'Loading...'}
//                 </h2>
//                 <FaYoutube className="absolute right-0 top-1 text-xl text-red-600" />
//             </div>
//             <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block h-[120px] w-full overflow-hidden rounded-xl"
//                 aria-labelledby={`video-title-${videoId}`}
//             >
//                 <img
//                     src={thumbnailUrl}
//                     alt={`Thumbnail of ${videoDetails?.title || 'Video'}`}
//                     onError={() => setThumbnailError(true)}
//                     className="h-full w-full object-cover"
//                 />
//             </a>
//         </figure>
//     ) : (
//         <article
//             className="border-greyBlue/50 w-full rounded-xl border px-4 pb-2 pt-4"
//             aria-label={`Video content: ${videoDetails?.title || 'Video'}`}
//         >
//             <div className="w-full text-left" aria-labelledby={`video-title-${videoId}`}>
//                 <div className="flex items-start gap-4">
//                     <div className="h-[120px] w-[213px]">
//                         <Image
//                             src={thumbnailUrl}
//                             alt={`Thumbnail of ${videoDetails?.title || 'Video'}`}
//                             onError={() => setThumbnailError(true)}
//                         />
//                     </div>
//                     <div className="flex h-[120px] flex-1 flex-col justify-between">
//                         <div>
//                             <h2 className="text-lg font-bold" id={`video-title-${videoId}`}>
//                                 {videoDetails?.title || 'Loading...'}
//                             </h2>
//                             <p className="text-sm text-gray-600">
//                                 By {videoDetails?.author || 'Loading...'} 
//                                 {publishDate && ` • ${formatDate(publishDate)}`} {/* Only show date if it exists */}
//                             </p>
//                         </div>
//                         <div className="flex gap-2">
//                             {tags.map((tag, index) => (
//                                 <UI.Badge 
//                                     key={index} 
//                                     text={tag.name} 
//                                     colorClass={tag.color} 
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {caption && <div className="mt-2 text-sm text-gray-500">{caption}</div>}
//         </article>
//     );

//     return url ? <A link={url}>{content}</A> : content;
// };

// function resolveUrl(base: string, relative: string): string {
//     try {
//         return new URL(relative, base).href;
//     } catch {
//         return relative; // If resolution fails, just return what we have
//     }
// }

// export const useWebsiteMetadata = (url: string) => {
//     const [metadata, setMetadata] = useState<{ title: string; description: string; logo: string } | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchMetadata = async () => {
//             try {
//                 const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(data.contents, 'text/html');

//                 // Title extraction (Try OG title, then <title>)
//                 const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim();
//                 const docTitle = doc.querySelector('title')?.textContent?.trim() || '';
//                 const title = ogTitle || docTitle || 'No Title';

//                 // Description extraction (Try og:description, then meta[name="description"])
//                 const ogDescription = doc
//                     .querySelector('meta[property="og:description"]')
//                     ?.getAttribute('content')
//                     ?.trim();
//                 const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim();
//                 const description = ogDescription || metaDescription || 'No description available';

//                 // Image/Icon extraction
//                 const imageCandidates = [
//                     doc.querySelector('meta[property="og:image"]')?.getAttribute('content'),
//                     doc.querySelector('link[rel="icon"]')?.getAttribute('href'),
//                     doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href'),
//                     doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href'),
//                     '/favicon.ico',
//                 ].filter(Boolean) as string[];

//                 const logo = imageCandidates.length ? resolveUrl(url, imageCandidates[0]) : '/default-logo.png';

//                 setMetadata({ title, description, logo });
//                 setIsLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch website metadata');
//                 setIsLoading(false);
//             }
//         };

//         fetchMetadata();
//     }, [url]);

//     return { metadata, isLoading, error };
// };

// export const ShortWebsiteContent: React.FC<{
//     url: string;
//     caption?: string;
// }> = ({ url, caption }) => {
//     const { metadata, isLoading, error } = useWebsiteMetadata(url);

//     if (isLoading) {
//         return <div>Loading website...</div>;
//     }

//     if (error || !metadata) {
//         return <div className="text-red-500">Failed to load website data</div>;
//     }

//     const { title, description, logo } = metadata;

//     const content = (
//         <article className="border-greyBlue/50 flex items-center gap-4 rounded-xl border p-3">
//             <div className="h-10 w-10 flex-none overflow-hidden rounded-md bg-gray-100">
//                 <img
//                     src={logo}
//                     alt={`${title} logo`}
//                     className="h-full w-full object-cover"
//                     onError={(e) => {
//                         (e.currentTarget as HTMLImageElement).src = '/default-logo.png';
//                     }}
//                 />
//             </div>

//             <div className="flex min-w-0 flex-col">
//                 <h3 className="truncate font-bold text-black">{title}</h3>
//                 <span className="truncate text-sm text-gray-600">{description}</span>
//             </div>
//         </article>
//     );

//     if (url) return <A link={url}>{content}</A>;
//     return content;
// };

// export const ChampionDiscussion: React.FC<{
//     name: string;
//     title: string;
//     roles: string[];
//     updates: string;
//     buffs?: [string, string][];
//     nerfs?: [string, string][];
//     neutral?: [string, string][];
//     patch?: string;
//     date?: string;
//     patchUrl?: string;
// }> = ({
//     name,
//     title,
//     roles,
//     updates,
//     buffs = [],
//     nerfs = [],
//     neutral = [],
//     patch = '14.22',
//     date = '05/11/2024',
//     patchUrl,
// }) => {
//     const [view, setView] = useState<'updates' | 'buffs' | 'nerfs' | 'neutral'>('updates');

//     const handleViewChange = (e: React.MouseEvent, newView: typeof view) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setView(view === newView ? 'updates' : newView);
//     };

//     const viewStyles = {
//         updates: 'border-greyBlue/50 hover:bg-gray-50',
//         buffs: 'bg-green-50/40 border-green-700',
//         nerfs: 'bg-red-50/40 border-red-700',
//         neutral: 'bg-gray-50/30 border-gray-500'
//     };

//     const buttonStyles = {
//         buffs: 'bg-green-500',
//         nerfs: 'bg-red-500',
//         neutral: 'bg-gray-300'
//     };

//     const content = (
//         <article className={`block w-full rounded-xl border p-4 ${viewStyles[view]}`}>
//             <div className="flex">
//                 <div className="h-44 w-44 flex-shrink-0">
//                     <ChampionRoleImage 
//                         champion={name} 
//                         url={`https://lolalytics.com/lol/${name.toLowerCase()}/build/`}
//                     />
//                 </div>
//                 <main className="border-greyBlue/50 ml-4 flex h-44 w-full border-l" onClick={(e) => e.stopPropagation()}>
//                     <nav className="w-12 flex flex-col items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
//                         {(['buffs', 'nerfs', 'neutral'] as const).map((key) => (
//                             <button
//                                 key={key}
//                                 onClick={(e) => handleViewChange(e, key)}
//                                 className={`h-3 w-3 rounded-full ${buttonStyles[key]} 
//                                     ${view === key ? 'ring-2 ring-offset-1' : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-1'}`}
//                                 aria-label={`View ${key}`}
//                             />
//                         ))}
//                     </nav>
//                     <div className="flex-1 ml-1">
//                         <header>
//                             <h2 className="text-xl font-bold">{name}: {title}</h2>
//                             <p className="text-sm text-gray-600">
//                                 {roles.join(' & ')} • Patch {patch} • {date}
//                             </p>
//                         </header>
//                         <section className="mt-2">
//                             <div className="flex items-center gap-2">
//                                 <h3 className="text-xl font-bold shrink-0">
//                                     {view.charAt(0).toUpperCase() + view.slice(1)}
//                                 </h3>
//                                 <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
//                             </div>
//                             <div className="no-scrollbar overflow-y-auto mt-2">
//                                 {view === 'updates' ? (
//                                     <Text text={updates} />
//                                 ) : (
//                                     <List items={view === 'buffs' ? buffs : view === 'nerfs' ? nerfs : neutral} />
//                                 )}
//                             </div>
//                         </section>
//                     </div>
//                 </main>
//             </div>
//         </article>
//     );

//     return patchUrl ? <A link={patchUrl}>{content}</A> : content;
// };
