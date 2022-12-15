/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    colors: {
      primary: '#efebeb',
      'primary-light': '#ffffff',
      'primary-dark': '#bdb9b9',
    },
    extend: {
      margin: {
        'zero-auto': '0 auto',
      }
    },
  },
  plugins: [],
};
