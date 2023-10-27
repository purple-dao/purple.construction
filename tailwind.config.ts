import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/nouns-builder-components/index.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "-apple-system, sans-serif",
      },
    },
  },
  plugins: [],
};

export default config;
