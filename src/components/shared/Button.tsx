import cc from "classcat";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentProps, FC, ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type Button = Common & { onClick?: ComponentProps<"button">["onClick"] };

type Link = Common & { linkProps: LinkProps };

const isLink = (props: Button | Link): props is Link => {
  return "href" in props;
};

export const Button: FC<Button | Link> = (props) => {
  return isLink(props) ? (
    <Link {...props.linkProps} legacyBehavior>
      <a
        className={cc([
          "w-full flex items-center justify-center font-bold rounded-full hover:bg-opacity-80",
          props.className,
        ])}
      >
        {props.children}
      </a>
    </Link>
  ) : (
    <button
      type="button"
      className={cc([
        "w-full flex items-center justify-center font-bold rounded-full hover:bg-opacity-80",
        props.className,
      ])}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
