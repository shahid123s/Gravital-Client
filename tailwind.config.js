/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        numberFont: ['Port Lligat Slab', 'serif']
      },
      fontSize: {
        '24px': '24px',
        '12px': '12px',
      },
      maxHeight: {
        '70': '70vh'
      },
      width: {
        '19': '19px'
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite'
      }
    },
  },
  plugins: [],
}