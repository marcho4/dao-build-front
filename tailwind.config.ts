import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'primary': '#1B1F3B',
				'secondary': '#c9ddff',
				'accent': '#252ad0',
				'off-white': '#F8F8F8',
				'green-accent': '#C2E812',
				dark: {
					'primary': '#1B1F3B',
					'secondary': '#F8F8F8',
					'accent': '#252ad0'
				},
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			animation: {
				marquee: 'marquee 10s linear infinite', // Название анимации
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
			},
		},
	},
	plugins: [],
};
export default config;