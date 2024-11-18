import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.125rem'
			},
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
