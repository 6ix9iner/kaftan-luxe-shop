
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
				}
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
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fadeInUp': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 40px, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'shine': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'50%': {
						transform: 'translateX(100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'typewriter': {
					'0%': {
						width: '0',
						borderRight: '2px solid'
					},
					'50%': {
						borderRight: '2px solid'
					},
					'100%': {
						width: '100%',
						borderRight: 'none'
					}
				},
				'scroll': {
					'0%': {
						opacity: '0',
						transform: 'translateY(0)'
					},
					'50%': {
						opacity: '1',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(20px)'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'gradient-y': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'center top'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'center bottom'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'shine': 'shine 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'typewriter': 'typewriter 2s steps(20) forwards',
				'scroll': 'scroll 2s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'gradient-y': 'gradient-y 15s ease infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
			backgroundImage: {
				'shimmer': 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
			},
			backgroundSize: {
				'300%': '300%',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			const newUtilities = {
				'.hover-scale': {
					'transition': 'all 0.3s ease',
					'&:hover': {
						'transform': 'scale(1.02)',
					}
				},
				'.glass-morphism': {
					'background': 'rgba(255, 255, 255, 0.1)',
					'backdrop-filter': 'blur(10px)',
					'border': '1px solid rgba(255, 255, 255, 0.2)',
				},
				'.text-gradient': {
					'background': 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--foreground)))',
					'background-clip': 'text',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
				},
				'.animate-shimmer': {
					'background': 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
					'background-size': '300% 100%',
					'animation': 'shimmer 3s ease-in-out infinite',
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
