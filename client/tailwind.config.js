/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito']
      },
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#EFEFEF',
          200: '#E2E2D5'
        },
      }
    },
  },
  plugins: [],
};