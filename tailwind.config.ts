import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        blue: "#74B3CE",
        cloud: "#F1F5F9",
        green: "#68B984",
        yellow: "#FFD166",
        gold: "#E8A87C",
        darkGreen: "#2C514C",
        gray: "#5C6B73",
      },
    },
  },
  plugins: [],
} satisfies Config;
