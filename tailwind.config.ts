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
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				foreground: 'var(--foreground)',
				primary: "#2F5233",
				secondary: "#8B4513",
				accent: "#FFB81C",
				background: "#F7F7F2",
				"text-primary": "#333333",
				"text-light": "#FFFFFF",
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.125rem'
			},
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
			},
			keyframes: {
				"fade-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.5s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
