<script>
    import {AngleRightOutline } from 'flowbite-svelte-icons';
	let authorInformation = {
		name: 'John Doe',
        title: 'CEO and Founder of Recall',
		bio: 'Corry Cummings is a seasoned entrepreneur and business strategist with a passion for building and scaling companies. Corry is dedicated to sharing his insights on business tech, entrepreneurship, business growth, and operational efficiency through his writing. As the CEO and Founder of SpeedtoScale.com, he focuses on creating sustainable growth and innovative strategies for businesses.',
		avatar: 'https://picsum.photos/150',
	};
</script>

<div class="flex items-center space-x-8 rounded-lg border border-gray-200 p-4">
	<img
		src={authorInformation.avatar}
		alt={authorInformation.name}
		class="h-28 w-28 rounded-full object-cover hover:ring-2 hover:ring-blue-500 cursor-pointer"
	/>
	<div class="flex flex-col space-y-2 font-spiegel">
		<div class="flex items-center gap-2">
			<h3 class="text-xl font-bold">{authorInformation.name}</h3>
			<span class="text-sm">•</span>
			<span class="text-sm text-gray-600">{authorInformation.title}</span>
		</div>
		<p class="text-sm text-gray-600">{authorInformation.bio}</p>
		<div class="group flex items-center space-x-1">
			<a href="#" class="group-hover:text-blue-500 text-sm"> See all of {authorInformation.name}'s content</a>
            <AngleRightOutline  class="w-3 h-3 group-hover:text-blue-500 transform duration-300 group-hover:translate-x-1"/>
		</div>
	</div>
</div>
