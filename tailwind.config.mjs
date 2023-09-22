const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        orange: colors.orange,
      },
      // proseの色をダークモードに対応させたい
      typography: (theme) => {
        return {
          light: {
            css: [
              {
                color: theme("colors.gray.400"),
                '[class~="lead"]': {
                  color: theme("colors.gray.300"),
                },
                a: {
                  color: theme("colors.white"),
                },
                strong: {
                  color: theme("colors.white"),
                },
                "ol > li::before": {
                  color: theme("colors.gray.400"),
                },
                "ul > li::before": {
                  backgroundColor: theme("colors.gray.600"),
                },
                hr: {
                  borderColor: theme("colors.gray.200"),
                },
                blockquote: {
                  color: theme("colors.gray.200"),
                  borderLeftColor: theme("colors.gray.600"),
                },
                h1: {
                  color: theme("colors.white"),
                },
                h2: {
                  color: theme("colors.white"),
                },
                h3: {
                  color: theme("colors.white"),
                },
                h4: {
                  color: theme("colors.white"),
                },
                "figure figcaption": {
                  color: theme("colors.gray.400"),
                },
                code: {
                  color: theme("colors.white"),
                },
                "a code": {
                  color: theme("colors.white"),
                },
                pre: {
                  color: theme("colors.gray.200"),
                  backgroundColor: theme("colors.gray.800"),
                },
                thead: {
                  color: theme("colors.white"),
                  borderBottomColor: theme("colors.gray.400"),
                },
                "tbody tr": {
                  borderBottomColor: theme("colors.gray.600"),
                },
              },
            ],
          },
        };
      },
    },
  },
  variants: { extend: { typography: ["dark"] } },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};

export default config;
