/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			display: ['Chelsea Market, serif'],
			mono: ['ui-monospace, monospace']
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {}
	},
	daisyui: {
		themes: ['cupcake'],
		logs: false
	},
	plugins: [require('daisyui')]
};
