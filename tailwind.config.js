/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0e0f12",
        "black-2": "#12141a",
        "black-3": "#1a1d26",
        gold: {
          DEFAULT: "#ad8957",
          m: "#a58d67",
          l: "#cead84",
          xl: "#e8d5b0",
        },
        navy: "#0f1f41",
        teal: "#407e8d",
        white: {
          DEFAULT: "#f9f5ec",
          70: "rgba(249,245,236,.7)",
          35: "rgba(249,245,236,.35)",
          12: "rgba(249,245,236,.12)",
          05: "rgba(249,245,236,.05)",
        },
        border: {
          b18: "rgba(173,137,87,.18)",
          b35: "rgba(173,137,87,.35)",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
