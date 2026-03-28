/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        gold: { DEFAULT:'#D4AF37', hover:'#B8962E', light:'#F7E7B5', pale:'#FDF8E8' },
      },
    },
  },
  plugins: [],
}
