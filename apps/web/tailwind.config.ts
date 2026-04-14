import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf6",
          100: "#d7f5e9",
          200: "#b1ead6",
          300: "#7fddbf",
          400: "#42c79f",
          500: "#1cae83",
          600: "#10946f",
          700: "#0f765b",
          800: "#105e49",
          900: "#0f4d3d"
        }
      }
    }
  },
  plugins: []
};

export default config;
