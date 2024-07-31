/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fc-blue': '#5f88bc',
      },

      screens: {
        xs: '580px',
        // => @media (min-width: 580px) { ... }
      },
    },
  },
  plugins: [],
};
