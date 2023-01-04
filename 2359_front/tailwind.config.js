/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        LAB: ['LABDigital'],
      },
      margin: {
        zeroAuto: '0 auto',
      },
      colors: {
        primary: '#efebeb',
        primaryLight: '#ffffff',
        primaryDark: '#bdb9b9',
        primaryDeepDark: '#706E6E',
      },
    },
  },
  plugins: [],
};
