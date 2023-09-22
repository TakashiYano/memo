/* eslint-disable func-style */
import type { ComponentProps, FC } from "react";

import cc from "classcat";

type MenuListItem = {
  disabled?: boolean;
  icon: JSX.Element;
  iconColor?: "blue" | "red";
  label: string;
  labelColor?: "blue" | "red";
  onClick: ComponentProps<"button">["onClick"];
};

export type MenuDialogListProps = {
  menu: (MenuListItem[] | string | undefined)[];
};

export const MenuDialogList: FC<MenuDialogListProps> = (props) => {
  const { menu } = props;

  return (
    <div className="space-y-5">
      {menu.map((item, i) => {
        if (!item) {
          return null;
        }

        if (typeof item === "string") {
          return (
            <div key={i} className="font-bold">
              {item}
            </div>
          );
        }

        return (
          <ul key={i}>
            {item.map((props) => {
              const { disabled, icon, iconColor, label, labelColor, onClick } = props;

              return (
                <li key={label} className="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl">
                  <button
                    className={cc([
                      "flex w-full items-center bg-gray-100 px-6 py-3 text-left focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-600",
                      {
                        "cursor-not-allowed text-gray-400 text-opacity-50": disabled,
                        "hover:bg-gray-200 dark:hover:bg-gray-600": !disabled,
                      },
                    ])}
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <div
                      className={cc([
                        "flex-1 font-bold",
                        {
                          "text-blue-500": !disabled && labelColor === "blue",
                          "text-red-500": !disabled && labelColor === "red",
                        },
                      ])}
                    >
                      {label}
                    </div>
                    <div
                      className={cc([
                        "h-5 w-5 flex-shrink-0",
                        {
                          "text-blue-500": !disabled && iconColor === "blue",
                          "text-red-500": !disabled && iconColor === "red",
                        },
                      ])}
                    >
                      {icon}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
