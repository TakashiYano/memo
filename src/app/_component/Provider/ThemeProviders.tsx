"use client";

import { type FC, type PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

export const ThemeProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};
