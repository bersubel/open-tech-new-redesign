/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5B21A',
          dark: '#D99A00',
          light: '#FFC94D',
          glow: 'rgba(245, 178, 26, 0.25)',
        },
        black: {
          DEFAULT: '#000000',
          soft: '#111111',
        },
        gray: {
          DEFAULT: '#777777',
          light: '#EAEAEA',
          dark: '#333333',
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}