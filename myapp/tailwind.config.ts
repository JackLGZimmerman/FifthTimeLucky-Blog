import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter var"', 'sans-serif'],
				beaufort: ['BeaufortforLOL', 'sans-serif'],
				spiegel: ['Spiegel', 'sans-serif'],
			},
			colors: {
				MagicBlue1: '#CDFAFA',
				MagicBlue2: '#0AC8B9',
				MagicBlue3: '#0397AB',
				MagicBlue4: '#005A82',
				MagicBlue5: '#0A323C',
				MagicBlue6: '#091428',
				MagicBlue7: '#0A1428',

				MetalGold1: '#F0E6D2',
				MetalGold2: '#C8AA6E',
				MetalGold3: '#C8AA6E',
				MetalGold4: '#C89B3C',
				MetalGold5: '#785A28',
				MetalGold6: '#463714',
				MetalGold7: '#32281E',

				Neutral1: '#A09B8C',

				Grey1: '#A09B8C',
				Grey15: '#5B5A56',
				Grey2: '#3C3C41',
				Grey3: '#1E2328',
				GreyCool: '#1E282D',

				htBlack: '#010A13',

				blueSide: '#0B2D36',
				blueSideBright: '#165C70',
				redSide: '#3B0B0B',
				redSideBright: '#661515',

				greyBlue: '#435B66',

				pipPurple1: '#9F7AEA',
				pipPurple2: '#553C9A',
			},
		},
	},

	plugins: [typography, forms, aspectRatio, containerQueries],
} satisfies Config;
