/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import "tailwindcss/tailwind.css";

import { memo } from "react";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useAddClassToBodyElem, useSessionRouter } from "src/pages-component/_app";

const App = (props: AppProps) => {
  const { pageProps, router } = props;
  useSessionRouter(router.asPath);
  useAddClassToBodyElem("dark:bg-gray-800");

  return (
    <ThemeProvider attribute="class">
      <props.Component {...pageProps} />
      <Toaster
        toastOptions={{
          className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold",
          duration: 2500,
        }}
      />{" "}
    </ThemeProvider>
  );
};

export default memo(App);
