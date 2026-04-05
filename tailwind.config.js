/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cv-blue': '#003D7A',
        'cv-dark-blue': '#001F4D',
      }
    },
  },
  plugins: [],
}
