// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A8141E",
        secondary: "#FDEFD3",
        white: "#FBFBFE",
        black: "#040316",
        accent: "#669BBC",
      },
      fontFamily: {
        display: ["Space Grotesk", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
