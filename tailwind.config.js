/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5A77FE',
          dark: '#1531B0',
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
        },
        tertiary: {
          DEFAULT: '#434343'
        },
        yellow: '#FEE75C',
        purple: '#A378FF',
        green: {
          DEFAULT: '#57F287',
          dark: '#1E7539',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        'boxes': 'repeat(auto-fill, minmax(200px, 1fr))',
        'games': 'repeat(auto-fill, minmax(315px, 1fr))',
        'battle-boxes': 'repeat(auto-fill, minmax(125px, 1fr))',
      }
    },
  },
  plugins: [],
}

