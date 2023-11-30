/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/screens/*.{js,jsx,ts,tsx}",
    "./app/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      eggwhite: "#FFFFE3",
      eggblack: "#10100E",
      eggorange: "#F18C5B",
      egggrey: "#282826",
      egglightgrey: "#5F5F5A",
      egglightorage: "#FF9E85",
      eggpink: "#FA8284",
    },
    extend: {},
  },
  plugins: [],
};
