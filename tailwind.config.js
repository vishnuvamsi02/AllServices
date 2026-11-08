/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#174A7E",
          hover: "#123a63",
          light: "#EBF3FB",
          dark: "#0E2F50",
        },
        secondary: {
          DEFAULT: "#239B62",
          hover: "#1c7d4f",
          light: "#EAF7F0",
          dark: "#16633e",
        },
        accent: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
          light: "#FEF3C7",
        },
        surface: {
          bg: "#F7F9FC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          subtle: "#F1F5F9",
        },
        charcoal: {
          DEFAULT: "#1F2937",
          muted: "#64748B",
          light: "#94A3B8",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Telugu', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(23, 74, 126, 0.06)',
        'lift': '0 10px 25px -5px rgba(23, 74, 126, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
