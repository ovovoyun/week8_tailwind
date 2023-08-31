/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./pages/**/*.html', './layout/**/*.ejs', './main.js'],
  theme: {
    container: {
      center: true,
    }
    ,extend: {
      colors: {
        primary: {
          100: '#E9E2F3',
          200: '#7000FF',
          300: '#6E01F8',
          400: '#380C7E'
        }
      },
      fontFamily: {
        display: ['Shrikhand'],
        sans: ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
