/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['cyberpunk'],
  },
  plugins: [require('daisyui')],
};
