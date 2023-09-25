const colors = require("tailwindcss/colors");
const { withTV } = require("tailwind-variants/transformer");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        orange: colors.orange,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix-colors")],
};

export default withTV(config);
