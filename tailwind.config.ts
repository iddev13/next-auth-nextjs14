/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '15px',
			},
			screens: {
				sm: '1240px',
			},
		},
		extend: {
			screens: {
				xs: '300px',
			},
			width: {
				'2full': '200%',
			},
			height: {
				'2full': '200%',
			},
			spacing: {
				'2full': '200%',
			},
			fontFamily: {
				poppins: ['var(--appFont)'],
				courier: ['var(--courierFont)'],
			},
			colors: {
				'text-color': 'var(--text-color)',
				'text-color1': 'var(--text-color1)',
				'text-color2': 'var(--text-color2)',
				'text-hover-color': 'var(--text-hover-color)',
				'text-hover-color1': 'var(--text-hover-color1)',
				'svg-color': 'var(--svg-color)',
				'burger-color': 'var(--burger-color)',
				'pulse-color': 'var(--pulse-color)',
				ui1: 'var(--ui1)',
			},
			backgroundImage: {
				'bg-color': 'var(--bg-color)',
				'bg1-color': 'var(--bg1-color)',
				'bg2-color': 'var(--bg2-color)',
				'bg3-color': 'var(--bg3-color)',
				'bg4-color': 'var(--bg4-color)',
				'bg5-color': 'var(--bg5-color)',
				'bg-burger-hover-color': 'var(--bg-burger-hover-color)',
			},
			keyframes: {
				showHeader: {
					'0%': {
						opacity: 0,
						top: '-200px',
					},
					'100%': {
						opacity: 1,
						top: 0,
					},
				},
				leftRoll: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' },
				},
				rightRoll: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				delayOverflow: {
					to: { overflow: 'visible' },
				},
				loading: {
					to: { width: '100%' },
				},
			},
			animation: {
				leftRoll: 'leftRoll linear 3s infinite both',
				rightRoll: 'rightRoll linear 3s infinite both',
				delayOverflow: 'delayOverflow linear 0.3s',
				loading: 'loading linear 0.7s both',
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }: any) {
			addComponents({
				'.pulse-btn': {
					position: 'relative',
					overflow: 'hidden',
					userSelect: 'none',
				},
			});
		}),
	],
};
