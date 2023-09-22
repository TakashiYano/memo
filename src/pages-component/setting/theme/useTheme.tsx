/* eslint-disable func-style */
import { useEffect, useMemo, useState } from "react";

import { useTheme as useNextTheme } from "next-themes";

type ExtendUseThemeProps = ReturnType<typeof useNextTheme> & {
  resolvedTheme: "light" | "dark";
  theme: "system" | "light" | "dark";
};

export const useTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme: handleTheme, theme: currentTheme } = useNextTheme() as ExtendUseThemeProps;
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
