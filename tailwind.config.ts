import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C1219',
          900: '#070D12',
          800: '#0C1219',
          700: '#121A22',
          600: '#1A242E',
          500: '#283540',
        },
        accent: {
          DEFAULT: '#2DD4BF',
          light: '#5EEAD4',
          dark: '#14B8A6',
        },
        mist: '#E0F7F4',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 45%, #14B8A6 100%)',
      },
      boxShadow: {
        accent: '0 14px 32px -12px rgba(45, 212, 191, 0.35)',
        glass: '0 20px 48px -24px rgba(0, 0, 0, 0.75)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -20px, 0) scale(1.04)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(16px, 12px, 0)' },
        },
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        'float-slow': 'float-slow 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
