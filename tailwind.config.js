/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx,jsx,js}", "./components/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      'sans': ['IBM Plex Sans', 'sans-serif'],
      'serif': ['IBM Plex Serif', 'serif'],
      'body': ['IBM Plex Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
