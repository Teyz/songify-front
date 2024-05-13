/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C1FF00',
          black: '#0C092A',
          red: '#ED4245',
        },
        secondary: {
          dark: '#1C1C1C',
          middark: '#222222',
          DEFAULT: '#272828',
          light: '#393939',
          midlight: '#BABABA',
          lighter: '#8D8D8D',
          lightest: '#DEDEE3',
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

