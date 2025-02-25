import daisyui from "daisyui"

export default {
	plugins: [
		daisyui,
	],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')["[data-theme=light]"],
				},
				dark: {
					...require('daisyui/src/colors/themes')["[data-theme=dark]"],
				},
			},
		],
	},
	theme: {
		extend: {},
	},
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
	]
}