/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Josefin Sans'", "sans-serif"],
        mono: ["'Courier Prime'", "monospace"],
      },
      colors: {
        stone: {
          950: "#0c0b09",
          900: "#1c1a14",
          800: "#2e2b20",
          700: "#3d3929",
          600: "#5c5640",
          500: "#8c8568",
          400: "#b5ae90",
          300: "#d4cdb0",
          200: "#e8e3d0",
          100: "#f4f1e8",
        },
        gold: {
          400: "#d4af6a",
          500: "#c49a45",
          600: "#a67c30",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
