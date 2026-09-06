import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08080a",
        card: "#111116",
        cardHover: "#16161e",
        cyanAccent: "#00f0ff",
        purpleAccent: "#8b5cf6",
        crimsonAccent: "#ff0055",
      },
      boxShadow: {
        "cyan-glow": "0 0 20px -5px rgba(0, 240, 255, 0.4)",
        "purple-glow": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
        "crimson-glow": "0 0 25px -5px rgba(255, 0, 85, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
