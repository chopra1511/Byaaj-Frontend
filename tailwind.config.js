/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        peach: {
          100: "#fce2e5",
          200: "#fac6cc",
          300: "#f7a9b2",
          400: "#f58d99",
          500: "#f2707f",
          600: "#c25a66",
          700: "#91434c",
          800: "#612d33",
          900: "#301619",
        },
      },
    },
    fontFamily: {
      musky: ["Musky"],
      cheque: ["Cheque"],
      milk: ["TT Milks Script Trl"],
      Poppins: ["Poppins"],
      Quicksand: ["Quicksand"],
      Pacifico: ["Pacifico"],
      Cursive: ["Giantasela"],
      kindHeart: ["Kind Heart"],
      Lemon: ["LEMONMILK-Bold"],
    },
    keyframes: {
      wiggle: {
        "0%": { letterSpacing: "1em", filter: "blur(20px)", opacity: "0" },
        "100%": { filter: "blur(0px)", opacity: "1" },
      },
      fadeIn: {
        "0%": { transform: "translateY(50px)", opacity: "0" },
        "100%": { transform: "translateY(0px)", opacity: "1" },
      },
      arrowDown: {
        "0%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(10px)" },
        "100%": { transform: "translateY(0)" },
      },
    },
    animation: {
      wiggle: "wiggle 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      fadeIn: "fadeIn 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      arrowDown: "arrowDown 1s infinite ease-in-out",
    },
  },
  plugins: [],
};
