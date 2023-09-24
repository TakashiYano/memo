import { tv } from "tailwind-variants";

import { type ButtonVariant } from "@/component/Button/type";

const button = tv({
  base: "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
  variants: {
    color: {
      ghost:
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 focus-visible:ring-blue-400",
      outline: "border dark:border-gray-500 focus:ring-2 focus:ring-blue-400",
      "solid-black":
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-900",
      "solid-blue":
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400",
      "solid-gray":
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600 focus-visible:ring-blue-400",
      "solid-red":
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400",
      "solid-white":
        "dark:text-black bg-white hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-200 dark:focus:bg-gray-200",
    },
  },
});

export const useButtonClass = (className?: string, variant?: ButtonVariant) => {
  const classes = button({ class: className, color: variant });

  return classes;
};
