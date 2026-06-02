import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
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

