
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom neon colors
				neon: {
					blue: "#38BDF8",
					green: "#22C55E",
					purple: "#8B5CF6",
				},
				dark: "#0F172A",
				light: "#E2E8F0",
			},
			fontFamily: {
				orbitron: ['Orbitron', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-neon': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1) drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2) drop-shadow(0 0 12px rgba(56, 189, 248, 1))'
					},
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
				'binary-rain': {
					'0%': { 
						transform: 'translateY(-100%)',
						opacity: '0', 
					},
					'10%': { 
						opacity: '1', 
					},
					'90%': { 
						opacity: '1', 
					},
					'100%': { 
						transform: 'translateY(100vh)',
						opacity: '0', 
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-neon': 'pulse-neon 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'binary-rain': 'binary-rain 10s linear infinite',
			},
			boxShadow: {
				'neon-blue': '0 0 8px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)',
				'neon-green': '0 0 8px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)',
				'neon-purple': '0 0 8px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
