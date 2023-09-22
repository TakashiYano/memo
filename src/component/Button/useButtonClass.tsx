/* eslint-disable func-style */
import { useMemo } from "react";

import cc from "classcat";

import type { ButtonVariant } from "./type";

export const useButtonClass = (className?: string, variant?: ButtonVariant) => {
  const classes = useMemo(() => {
    return cc([
      "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
      {
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600 focus-visible:ring-blue-400":
          variant === "solid-gray",
        "border dark:border-gray-500 focus:ring-2 focus:ring-blue-400": variant === "outline",
        "dark:text-black bg-white hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-200 dark:focus:bg-gray-200":
          variant === "solid-white",
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 focus-visible:ring-blue-400":
          variant === "ghost",
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-900":
          variant === "solid-black",
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400":
          variant === "solid-blue",
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400":
          variant === "solid-red",
      },
      className,
    ]);
  }, [className, variant]);

  return classes;
};
