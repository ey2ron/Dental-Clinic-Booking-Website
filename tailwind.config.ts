import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#526b50",
          dark: "#273c2b",
          accent: "#6f8b6d",
          sage: "#e9eee5",
          cream: "#f7f4ee",
          border: "#dde2d8",
          muted: "#687167",
          charcoal: "#2d3748",
          gold: "#d4b688",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        float: "0px 6px 24px 0px rgba(39, 60, 43, 0.09)",
        soft: "0px 10px 30px -4px rgba(39, 60, 43, 0.08)",
      },
      borderRadius: {
        pill: "100px",
      },
    },
  },
  plugins: [],
};

export default config;

