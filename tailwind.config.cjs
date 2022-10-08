/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        'up-lg': ['0 -10px 8px rgba(0, 0, 0, 0.05)', '0 -4px 3px rgb(0 0 0 / 0.1)'],
      }
    },
  },
  plugins: [],
};
