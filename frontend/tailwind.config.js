/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: {
          50:  '#FDFAF5',
          100: '#F9F4EA',
          200: '#F2EEE6',
          300: '#E4DDD0',
          400: '#D5CCBB',
        },
        warm: {
          300: '#C4B8A8',
          400: '#A89A87',
          500: '#8C7D6B',
          600: '#6E6050',
          700: '#504538',
          800: '#2E2520',
          900: '#1A1814',
        },
        amber: {
          DEFAULT: '#B07A45',
          light: '#F5EDE0',
          dark: '#8A5E32',
        },
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
