/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-100': '#f2f2f2',
      },

      screens: {
        xs: '580px',
        // => @media (min-width: 580px) { ... }
      },
    },
  },
  plugins: [],
};
