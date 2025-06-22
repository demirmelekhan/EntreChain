/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6f00',
        secondary: '#ffd180', 
        accent: '#FF0059',
        background: '#fefcfb',
        foreground: '#212121',
      },
    },
  },
  plugins: [],
}
