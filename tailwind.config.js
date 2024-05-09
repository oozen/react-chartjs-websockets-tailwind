/** @type {import('tailwindcss').Config} */
const { colors, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans]
      },
      colors: {
        gray: {
          ...colors.gray,
          500: "#71717A",
          700: "#3F3F46",
          900: "#18181B"
        },
        "dark-gray": "#212121",
        "mid-gray": "#80808F",
        "light-gray": "#B5B5C3",
        "background-gray": "#F5F5F5",
        "title-gray": "#111827",
        "background-link": "#334155",
        "dark-blue": "#313860"
      }
    }
  },
  plugins: []
};
