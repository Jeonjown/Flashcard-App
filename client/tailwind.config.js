/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
      },
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#EFEFEF',
          200: '#E2E2D5',
        },
      },
      perspective: {
        '1000': '1000px',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-flip': {
          transform: 'rotateY(180deg)',
        },
      }, ['responsive', 'hover']);
    },
  ],
};
