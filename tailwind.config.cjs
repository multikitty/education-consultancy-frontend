/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*{.js,ts,jsx}",
  ],

  theme: {
    screens: {
      laptop: "1900px",
    },
    extend: {
      colors: {
        disqualified: "#B70D52",
      },
    },
    fontFamily: {
      display: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("flowbite/plugin"),
  ],
});
