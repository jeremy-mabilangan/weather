/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fc-blue": "#5f88bc",
      },
      screens: {
        xs: "580px",
        // => @media (min-width: 580px) { ... }
      },
      keyframes: {
        slideInFromRight: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInFromLeft: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInFromBottom: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideInFromRight:
          "slideInFromRight .25s ease-in-out forwards var(--delay, 0)",
        slideInFromLeft:
          "slideInFromLeft .25s ease-in-out forwards var(--delay, 0)",
        slideInFromBottom:
          "slideInFromBottom .25s ease-in-out forwards var(--delay, 0)",
      },
    },
  },
  plugins: [],
};
