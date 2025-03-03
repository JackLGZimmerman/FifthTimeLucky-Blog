<script lang="ts">
	import { QuoteSolid } from 'flowbite-svelte-icons';

	let {
		quote,
		author,
		date,
		link = undefined,
	} = $props() as {
		quote: string;
		author: string;
		date: string;
		link?: string;
	};

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}
</script>

{#if link}
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		class="block no-underline transition-opacity hover:opacity-95"
	>
		<blockquote
			class="relative border-b border-t border-gray-500 bg-gray-50/30 p-6"
			aria-label="Quote from {author} on {formatDate(date)}"
		>
			<div
				class="absolute -top-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2
               rounded-3xl bg-white p-2 text-3xl text-black shadow-md"
			>
				<QuoteSolid />
			</div>

			<p class="text-base text-gray-900">
				{quote}
			</p>

			<footer class="mt-2 flex items-center text-sm text-gray-600">
				<span class="font-semibold" aria-label="Author">— {author}</span>
				<span class="mx-2" aria-hidden="true">•</span>
				<time datetime={date} aria-label="Quote date">
					{formatDate(date)}
				</time>
			</footer>
		</blockquote>
	</a>
{:else}
	<blockquote
		class="relative border-b border-t border-gray-500 bg-gray-50/30 p-6"
		aria-label="Quote from {author} on {formatDate(date)}"
	>
		<div
			class="absolute -top-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2
             rounded-3xl bg-white p-2 text-3xl text-black shadow-md"
		>
			<QuoteSolid />
		</div>
		<p class="text-base text-gray-900">
			{quote}
		</p>
		<footer class="mt-2 flex items-center text-sm text-gray-600">
			<span class="font-semibold" aria-label="Author">— {author}</span>
			<span class="mx-2" aria-hidden="true">•</span>
			<time datetime={date} aria-label="Quote date">
				{formatDate(date)}
			</time>
		</footer>
	</blockquote>
{/if}
