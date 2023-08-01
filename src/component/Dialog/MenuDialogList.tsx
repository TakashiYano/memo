import cc from "classcat";
import type { ComponentProps, FC } from "react";

type MenuListItem = {
  label: string;
  labelColor?: "blue" | "red";
  icon: JSX.Element;
  iconColor?: "blue" | "red";
  onClick: ComponentProps<"button">["onClick"];
  disabled?: boolean;
};

/** @package */
export type MenuDialogListProps = {
  menu: (MenuListItem[] | string | undefined)[];
};

/** @package */
export const MenuDialogList: FC<MenuDialogListProps> = (props) => {
  return (
    <div className="space-y-5">
      {props.menu.map((item, i) => {
        if (!item) return null;

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
              return (
                <li key={props.label} className="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl">
                  <button
                    className={cc([
                      "flex w-full items-center bg-gray-100 px-6 py-3 text-left focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-600",
                      {
                        "hover:bg-gray-200 dark:hover:bg-gray-600": !props.disabled,
                        "cursor-not-allowed text-gray-400 text-opacity-50": props.disabled,
                      },
                    ])}
                    onClick={props.onClick}
                    disabled={props.disabled}
                  >
                    <div
                      className={cc([
                        "flex-1 font-bold",
                        {
                          "text-blue-500": !props.disabled && props.labelColor === "blue",
                          "text-red-500": !props.disabled && props.labelColor === "red",
                        },
                      ])}
                    >
                      {props.label}
                    </div>
                    <div
                      className={cc([
                        "h-5 w-5 flex-shrink-0",
                        {
                          "text-blue-500": !props.disabled && props.iconColor === "blue",
                          "text-red-500": !props.disabled && props.iconColor === "red",
                        },
                      ])}
                    >
                      {props.icon}
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
