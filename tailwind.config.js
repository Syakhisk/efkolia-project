const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				mobile: { max: "767px" },
			},
			colors: {
				brand: {
					lighter: "#36B5A2",
					light: "#24908A",
					DEFAULT: "#007379",
					dark: "#073642",
					darker: "#002B36",
				},
				muted: colors.gray[300],
			},
			spacing: {
				sidebar: "20rem",
				"sidebar-collapsed": "78px",
				navbar: "4rem",
			},
		},
		fontFamily: {
			sans: ['"Open Sans"', "sans-serif"],
		},
	},
	variants: {
		extend: {
			animation: ["group-hover", "hover", "focus"],
			fontWeight: ["group-hover", "hover", "focus"],
		},
	},
	plugins: [],
	// future: {
	// 	removeDeprecatedGapUtilities: true,
	// 	purgeLayersByDefault: true,
	// },
};
