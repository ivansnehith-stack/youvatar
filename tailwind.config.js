/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        primary: "#3949AB",
        secondary: "#121212",
        white: "#FFFFFF",
        black: "#000000",
        border: "#D8DADC",
        gray: { 400: "#808080" },
        "dark-grey": "#C7C9D9",
      },
    },
    plugins: [],
  },
};
