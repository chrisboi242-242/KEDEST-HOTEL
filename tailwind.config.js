/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hotelNavy: '#001F3F',
        hotelGold: '#D4AF37',
        hotelSoftWhite: '#F9F9F9',
      },
      fontFamily: {
        luxury: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}