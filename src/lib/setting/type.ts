import { type useTheme as useNextTheme } from "next-themes";

export type ExtendUseThemeType = ReturnType<typeof useNextTheme> & {
  resolvedTheme: "light" | "dark";
  theme: "system" | "light" | "dark";
};
