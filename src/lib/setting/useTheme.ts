"use client";

import { useEffect, useMemo, useState } from "react";

import { useTheme as useNextTheme } from "next-themes";

type ExtendUseThemeType = ReturnType<typeof useNextTheme> & {
  resolvedTheme: "light" | "dark";
  theme: "system" | "light" | "dark";
};

export const useTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme: handleTheme, theme: currentTheme } = useNextTheme() as ExtendUseThemeType;
  const themes = useMemo(() => {
    return [
      { id: "system", label: "端末の設定に合わせる" },
      { id: "light", label: "ライト" },
      { id: "dark", label: "ダーク" },
    ] as const;
  }, []);
  useEffect(() => {
    return setIsMounted(true);
  }, []);

  return { currentTheme, handleTheme, isMounted, themes };
};
