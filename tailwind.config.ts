
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ocean: {
					deep: '#001F3F',
					DEFAULT: '#0077B6',
					light: '#90E0EF',
					surface: '#CAF0F8',
					bioluminescent: '#7FFFD4'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fish-swim-left': {
					'0%': { transform: 'translateX(100vw) translateY(0)' },
					'10%': { transform: 'translateX(80vw) translateY(5vh)' },
					'25%': { transform: 'translateX(60vw) translateY(-5vh)' },
					'40%': { transform: 'translateX(40vw) translateY(10vh)' },
					'60%': { transform: 'translateX(20vw) translateY(-10vh)' },
					'75%': { transform: 'translateX(10vw) translateY(0)' },
					'100%': { transform: 'translateX(-20vw) translateY(0)' }
				},
				'fish-swim-right': {
					'0%': { transform: 'translateX(-20vw) translateY(0) scaleX(-1)' },
					'15%': { transform: 'translateX(10vw) translateY(-5vh) scaleX(-1)' },
					'30%': { transform: 'translateX(30vw) translateY(8vh) scaleX(-1)' },
					'50%': { transform: 'translateX(50vw) translateY(-8vh) scaleX(-1)' },
					'70%': { transform: 'translateX(70vw) translateY(5vh) scaleX(-1)' },
					'85%': { transform: 'translateX(90vw) translateY(-3vh) scaleX(-1)' },
					'100%': { transform: 'translateX(110vw) translateY(0) scaleX(-1)' }
				},
				'bubble-rise': {
					'0%': { transform: 'translateY(100vh) scale(0.5)', opacity: '0.2' },
					'50%': { transform: 'translateY(50vh) scale(1)', opacity: '0.6' },
					'100%': { transform: 'translateY(0) scale(1.5)', opacity: '0' }
				},
				'float-up-down': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'wave': {
					'0%': { transform: 'translateX(0) translateY(0)' },
					'25%': { transform: 'translateX(-5px) translateY(5px)' },
					'50%': { transform: 'translateX(0) translateY(0)' },
					'75%': { transform: 'translateX(5px) translateY(-5px)' },
					'100%': { transform: 'translateX(0) translateY(0)' }
				},
				'page-fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'progress-fill': {
					'0%': { width: '0%' },
					'100%': { width: 'var(--progress-width)' }
				},
				'jellyfish-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fish-swim-left': 'fish-swim-left 30s linear infinite',
				'fish-swim-right': 'fish-swim-right 35s linear infinite',
				'bubble-rise': 'bubble-rise 15s ease-in infinite',
				'float': 'float-up-down 3s ease-in-out infinite',
				'glow': 'pulse-glow 4s ease-in-out infinite',
				'wave': 'wave 3s ease-in-out infinite',
				'page-fade-in': 'page-fade-in 0.8s ease-out forwards',
				'progress-fill': 'progress-fill 1.5s ease-out forwards',
				'jellyfish-pulse': 'jellyfish-pulse 5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
