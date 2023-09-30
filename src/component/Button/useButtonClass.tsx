import { tv } from "tailwind-variants";

import { type ButtonVariant } from "@/component/Button/type";

const button = tv({
  base: "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
  variants: {
    color: {
      error:
        "bg-red-4 dark:bg-reddark-4 hover:bg-red-5 dark:hover:bg-reddark-5 active:bg-red-6 dark:active:bg-reddark-6",
      ghost:
        "bg-transparent dark:bg-transparent hover:enabled:bg-indigo-4 dark:hover:enabled:bg-indigodark-4 active:enabled:bg-indigo-5 dark:active:enabled:bg-indigodark-5",
      outline:
        "text-indigo-12 dark:text-indigodark-12 border active:bg-indigo-6 dark:active:bg-indigodark-6 border-indigo-7 dark:border-indigodark-7 hover:border-indigo-8 dark:hover:border-indigodark-8",
      solid:
        "bg-indigo-4 dark:bg-indigodark-4 hover:enabled:bg-indigo-5 dark:hover:enabled:bg-indigodark-5 active:enabled:bg-indigo-6 dark:active:enabled:bg-indigodark-6 disabled:opacity-75",
      ui: "bg-indigo-3 dark:bg-indigodark-3 hover:bg-indigo-4 dark:hover:bg-indigodark-4 active:bg-indigo-5 dark:active:bg-indigodark-5",
    },
  },
});

export const useButtonClass = (className?: string, variant?: ButtonVariant) => {
  const classes = button({ class: className, color: variant });

  return classes;
};
