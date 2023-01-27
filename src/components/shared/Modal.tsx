/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { ComponentProps, FC, ReactNode } from "react";

type Props = {
  open: boolean;
  className?: string;
  onClick: ComponentProps<"button">["onClick"];
  children?: ReactNode;
  drawer?: boolean;
};

export const Modal: FC<Props> = (props) => {
  const classes = cc([
    "border-0 rounded-lg shadow-lg relative flex flex-col w-full z-50 bg-white outline-none focus:outline-none",
    props.className,
  ]);

  if (!props.open) {
    return null;
  }

  return (
    <div
      className={cc([
        "fixed w-full inset-0 flex justify-center transition-all outline-none focus:outline-none",
        {
          "items-center": !props.drawer,
          "items-end": props.drawer,
        },
      ])}
    >
      <div className={classes}>{props.children}</div>
      <div className="opacity-20 fixed inset-0 z-10 bg-black" />
    </div>
  );
};