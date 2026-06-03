import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Aptos", "Segoe UI", "sans-serif"]
      },
      colors: {
        thunder: {
          ink: "#101820",
          storm: "#24323d",
          bolt: "#f5c542",
          rain: "#e7eef2",
          steel: "#8aa0a8",
          mint: "#5ed6a0",
          ember: "#ef6f4e"
        }
      }
    }
  },
  plugins: []
};

export default config;

