/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			blue: "#1b5cbf",
			"dark-blue": "#043785",
			"light-blue": "#377ce6",
			gray: "#8492a6",
			"light-gray": "#e6e8ed",
			white: "#ffffff",
			modal: "rgba(0,0,0,0.0)",
			green: "#07ba0a",
			modal: "rgb(0,0,0, 0.4)",
			red: "#ff0000",
			bg: "#000033",
			"light-red": "#d15e5e",
		},
		extend: {
			backgroundImage: {
				main: "url('/Gotham.jpg')",
			},
		},
	},
	plugins: [],
};
