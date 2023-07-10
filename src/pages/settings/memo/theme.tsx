import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import cc from "classcat";
import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { useTheme } from "src/pages-component/setting/memo";

const SettingsMemoTheme: NextPage = () => {
  const { themes, isMounted, currentTheme, handleTheme } = useTheme();
  if (!isMounted) return null;

  return (
    <Layout left="back" center="テーマ">
      <RadioGroup value={currentTheme} onChange={handleTheme}>
        <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
        {themes.map((theme) => {
          return (
            <RadioGroup.Option
              key={theme.id}
              value={theme.id}
              className={({ active, checked }) => {
                return cc([
                  "-mx-4 cursor-pointer hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700",
                  {
                    "bg-gray-100 dark:bg-gray-700": checked || active,
                  },
                ]);
              }}
            >
              {({ checked }) => {
                return (
                  <div className="flex items-center justify-between px-4 py-3 text-lg">
                    <RadioGroup.Label className="font-bold">{theme.label}</RadioGroup.Label>
                    {checked ? <CheckIcon className="h-6 w-6 text-blue-500" /> : null}
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    </Layout>
  );
};

export default SettingsMemoTheme;
