/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				purple: {
					darkpurple: '#0E0333',
				},
				yellow: '#FFF8DB',
				blue: {
					darkblue: '#0E0333',
					light: '#445070',
				},
				gray: {
					dark: '#283362',
				},
				green: {
					jade: '#02E2AC',
				},
			},
		},
	},
	plugins: [],
};
