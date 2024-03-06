/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['cyberpunk'],
  },
  plugins: [require('daisyui')],
};
