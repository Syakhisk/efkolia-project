module.exports = {
	purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				green: {
					900: "#002b36",
					600: "#073642",
					300: "#26958e",
				},
			},
		},
		fontFamily: {
			sans: ['"Open Sans"', "sans-serif"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
};
