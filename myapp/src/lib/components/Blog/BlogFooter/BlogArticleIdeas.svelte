<script>
	const contactInformation = {
		email: 'johnDoe@hotmail.com',
		discord: {
			tag: 'JohnDoe#1234',
			id: '02866937617973260'
		},
		twitter: '@JohnDoe',
	};
</script>

<div class="flex flex-col rounded-lg border border-blue-100 bg-blue-50/50 p-4 font-spiegel">
	<h3 class="mb-1 text-base font-bold">Have an Article Idea?</h3>
	<address class="text-sm text-gray-600 not-italic">
		<p>
			Got an interesting topic you'd like to see covered? Reach out via 
			<a href="mailto:{contactInformation.email}" class="text-blue-600 hover:underline">{contactInformation.email}</a>, 
			find us on Discord at <a href="https://discordapp.com/users/{contactInformation.discord.id}" class="text-blue-600 hover:underline">{contactInformation.discord.tag}</a>, or tweet us at 
			<a href="https://twitter.com/{contactInformation.twitter}" class="text-blue-600 hover:underline">{contactInformation.twitter}</a>.
		</p>
	</address>
</div>
