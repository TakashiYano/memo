"use client";

import { type FC } from "react";

import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { useTheme } from "@/lib/setting/useTheme";

const list = tv({
  base: "-mx-4 cursor-pointer focus:outline-none hover:bg-indigo-3 dark:hover:bg-indigodark-3 active:bg-indigo-3 dark:active:bg-indigodark-3",
  variants: {
    checked: {
      true: "bg-indigo-3 dark:bg-indigodark-3",
    },
  },
});

export const ThemeList: FC = () => {
  const { currentTheme, handleTheme, isMounted, themes } = useTheme();
  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 border-b border-indigo-6 dark:border-indigodark-6">
      <h2 className="text-xl font-bold text-indigo-11 dark:text-indigodark-11">テーマ変更</h2>
      <RadioGroup value={currentTheme} onChange={handleTheme}>
        <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
        {themes.map((theme) => {
          return (
            <RadioGroup.Option
              key={theme.id}
              value={theme.id}
              className={({ checked }) => {
                return list({ checked });
              }}
            >
              {({ checked }) => {
                return (
                  <div className="flex items-center justify-between px-4 py-3 text-lg">
                    <RadioGroup.Label className="ml-3 font-bold">{theme.label}</RadioGroup.Label>
                    {checked ? (
                      <CheckIcon className="h-6 w-6 text-indigo-11 dark:text-indigodark-11" />
                    ) : null}
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    </div>
  );
};
