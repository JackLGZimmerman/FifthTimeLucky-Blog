<script>
	import BlogStats from './BlogStats.svelte';
	import BlogTags from './BlogColouredPips.svelte';
	import BlogReadingTime from './BlogReadingTime.svelte';
	import BlogTitle from '../BlogTitle/BlogTitle.svelte';
	import BlogVersionControl from '../BlogVersionControl/BlogVersionControl.svelte';
	import BlogColouredPips from './BlogColouredPips.svelte';

	const SOCIAL_MEDIA_LINKS = [
		{
			title: 'Share on Twitter',
			ariaLabel: 'Share on Twitter',
			href: 'https://twitter.com/share',
			colorClass: 'text-[#1DA1F2]',
			Icon: 'FaTwitter',
		},
		{
			title: 'Share on LinkedIn',
			ariaLabel: 'Share on LinkedIn',
			href: 'https://www.linkedin.com/shareArticle',
			colorClass: 'text-[#0077b5]',
			Icon: 'FaLinkedin',
		},
		{
			title: 'Share on Instagram',
			ariaLabel: 'Share on Instagram',
			href: 'https://www.instagram.com/',
			colorClass: 'text-[#E4405F]',
			Icon: 'FaInstagram',
		},
		{
			title: 'Share on WhatsApp',
			ariaLabel: 'Share on WhatsApp',
			href: 'https://api.whatsapp.com/send',
			colorClass: 'text-[#25D366]',
			Icon: 'FaWhatsapp',
		},
		{
			title: 'Share on Reddit',
			ariaLabel: 'Share on Reddit',
			href: 'https://reddit.com/submit',
			colorClass: 'text-[#FF4500]',
			Icon: 'FaReddit',
		},
	];

	const tags = ['Strategy', 'Drafting', 'Advanced'];
</script>

<div class="flex flex-col gap-6">
	<section class="flex w-full items-center justify-between">
		<div class="flex items-center gap-2">
			{#each tags as tag (tag)}
				<BlogColouredPips name={tag} />
			{/each}
			<BlogStats />
		</div>
		<BlogReadingTime />
	</section>
	<BlogTitle />
	<BlogVersionControl />
</div>
