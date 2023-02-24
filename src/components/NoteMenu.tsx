/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { ComponentProps, FC } from "react";

type MenuItem = {
  label: string;
  labelColor?: "blue" | "red";
  icon: JSX.Element;
  iconColor?: "blue" | "red" | "twitter";
  onClick: ComponentProps<"button">["onClick"];
  disabled?: boolean;
};

export type NoteMenuProps = {
  menu: (MenuItem[] | string | undefined)[];
};

export const NoteMenu: FC<NoteMenuProps> = (props) => {
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
                      "flex w-full items-center bg-gray-100 py-3 px-6 text-left focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-600",
                      {
                        "hover:bg-gray-200 dark:hover:bg-gray-600": !props.disabled,
                        "text-gray-400 text-opacity-50 cursor-not-allowed": props.disabled,
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
                        "flex-shrink-0 w-5 h-5",
                        {
                          "text-blue-500": !props.disabled && props.iconColor === "blue",
                          "text-red-500": !props.disabled && props.iconColor === "red",
                          "text-blue-400": !props.disabled && props.iconColor === "twitter",
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
