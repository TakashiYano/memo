/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentProps, FC, ReactNode } from "react";

type CommonType = {
  bgColor?: "blue" | "red" | "black" | "white" | "gray" | "transparent";
  textColor?: "black" | "red" | "blue";
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  justifyContent?: "justify-center" | "justify-start" | "justify-between";
  size?: "large" | "small" | "extrasmall";
};

type ButtonType = CommonType & {
  button: boolean;
  onClick?: ComponentProps<"button">["onClick"];
};

type LinkType = CommonType & {
  linkProps: LinkProps;
};

// props の型がbutton型かlink型かを判断する関数を定義する。
// props に button を持っている場合は true
const isButton = (props: ButtonType | LinkType): props is ButtonType => {
  return "button" in props;
};

export const Button: FC<ButtonType | LinkType> = (props) => {
  const classes = cc([
    "mx-auto rounded-full focus:outline-none flex flex-row whitespace-nowrap",
    props.justifyContent,
    {
      "py-4 px-8 my-4": props.size === "large",
      "py-2 px-4 my-4": props.size === "small",
      "py-1 px-1 my-0": props.size === "extrasmall",
    },
  ]);

  const colorClasses = cc({
    "text-white bg-blue-500 hover:bg-blue-600": props.bgColor === "blue",
    "text-white bg-red-500 hover:bg-red-600": props.bgColor === "red",
    "text-black bg-gray-200 hover:bg-gray-300": props.bgColor === "gray",
    "text-white bg-black hover:bg-gray-500": props.bgColor === "black",
    "bg-white hover:bg-gray-300": props.bgColor === "white",
    "bg-transparent": props.bgColor === "transparent",
    "text-black": (props.bgColor === "white" || props.bgColor === "transparent") && props.textColor === "black",
    "text-red-500": props.bgColor === "white" && props.textColor === "red",
    "text-blue-500": (props.bgColor === "white" || props.bgColor === "transparent") && props.textColor === "blue",
  });

  const iconClasses = cc([
    "my-auto",
    {
      "mr-3": props.startIcon && props.size === "large",
      "mr-2": props.startIcon && props.size === "small",
      "ml-3": props.endIcon && props.size === "large",
      "ml-2": props.endIcon && props.size === "small",
    },
  ]);

  if (props.disabled) {
    return (
      <button
        className={cc(["text-gray-400 bg-gray-200 cursor-not-allowed", classes, props.className])}
        disabled={props.disabled}
      >
        {props.startIcon ? <span className={iconClasses}>{props.startIcon}</span> : null}
        <span>{props.children}</span>
        {props.endIcon ? <span className={iconClasses}>{props.endIcon}</span> : null}
      </button>
    );
  }

  return isButton(props) ? (
    <button className={cc([classes, colorClasses, props.className])} onClick={props.onClick}>
      {props.startIcon ? <span className={iconClasses}>{props.startIcon}</span> : null}
      <span>{props.children}</span>
      {props.endIcon ? <span className={iconClasses}>{props.endIcon}</span> : null}
    </button>
  ) : (
    <Link {...props.linkProps} legacyBehavior>
      <a className={cc([classes, colorClasses, props.className])}>
        {props.startIcon ? <span className={iconClasses}>{props.startIcon}</span> : null}
        <span>{props.children}</span>
        {props.endIcon ? <span className={iconClasses}>{props.endIcon}</span> : null}
      </a>
    </Link>
  );
};

// Propsのデフォルト値
Button.defaultProps = {
  bgColor: "blue",
  textColor: "black",
  size: "small",
  justifyContent: "justify-center",
};