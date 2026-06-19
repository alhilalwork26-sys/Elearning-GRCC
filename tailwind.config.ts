import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B2447", dk: "#071830", md: "#19376D", lt: "#2B5282" },
        teal: { DEFAULT: "#14B8A6", dk: "#0D9488", lt: "#CCFBF1" },
        gold: { DEFAULT: "#F59E0B", lt: "#FEF3C7" },
        bg: "#F0F5FF",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
