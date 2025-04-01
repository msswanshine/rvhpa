import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      
      '3xl': '2000px',
      // => @media (min-width: 2000px) { ... }
    },
    extend: {
      colors: {
        black: "#000000",
        darkGray: "#202020",
        white: "#FFFFFF",
        gray: "#505050",
        blue: "#4A90E2",
        purple: "#9013FE",
        green: "#13FE90",
        gold: "#D4AF37"
      },
    },
  },
  plugins: [],
} satisfies Config;
