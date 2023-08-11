import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { memo } from "react";
import { Toaster } from "react-hot-toast";
import { useAddClassToBodyElem, useSessionRouter } from "src/pages-component/_app";

// if (process.env.NODE_ENV === "development") {
//   require("src/api/mock");
// }

const App = (props: AppProps) => {
  useSessionRouter(props.router.asPath);
  useAddClassToBodyElem("dark:bg-gray-800");

  return (
    <ThemeProvider attribute="class">
      <props.Component {...props.pageProps} />
      <Toaster toastOptions={{ duration: 2500, className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold" }} />{" "}
    </ThemeProvider>
  );
};

export default memo(App);
