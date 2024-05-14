/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C1FF00',
          black: '#0C092A',
          red: '#FA003F',
        },
        secondary: {
          dark: '#1C1C1C',
          middark: '#222222',
          DEFAULT: '#272828',
          light: '#EFEEFC',
          lighter: '#858494',
          grey: '#858494'
        }
      },
      fontFamily: {
        rubik: ['Rubik Variable', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

