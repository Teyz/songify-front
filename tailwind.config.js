/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6562DE',
          black: '#0C092A',
          red: '#CE2D4F',
        },
        secondary: {
          blue: '#C4D0FB',
          dark: '#1C1C1C',
          middark: '#222222',
          DEFAULT: '#272828',
          light: '#E5E5E5',
          lighter: '#808080',
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

