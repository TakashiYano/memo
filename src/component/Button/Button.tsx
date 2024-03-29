import { forwardRef, type ForwardedRef } from "react";

import { type ButtonType } from "@/component/Button/type";

import { useButtonClass } from "./useButtonClass";

export const Button = forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
  const { children, className, variant, ...rest } = props;
  const classes = useButtonClass(className, variant);
  return (
    <button
      type="button"
      ref={ref as ForwardedRef<HTMLButtonElement>}
      {...rest}
      className={classes}
    >
      {children}
    </button>
  );
});

Button.displayName === "Button";
