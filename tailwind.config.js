const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        slate: colors.slate,
      },
    },
  },
  variants: { extend: {} },
  plugins: [require("@tailwindcss/typography")],
};
