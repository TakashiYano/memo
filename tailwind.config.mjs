const { withTV } = require("tailwind-variants/transformer");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {},
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix-colors")],
};

export default withTV(config);
