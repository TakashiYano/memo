import { forwardRef, type ForwardedRef } from "react";
import Link from "next/link";

import { type AnchorType } from "@/component/Button/type";

import { useButtonClass } from "./useButtonClass";

export const Anchor = forwardRef<HTMLAnchorElement, AnchorType>((props, ref) => {
  const { children, className, variant, ...rest } = props;
  const classes = useButtonClass(className, variant);
  return (
    <Link {...rest} ref={ref as ForwardedRef<HTMLAnchorElement>} className={classes}>
      {children}
    </Link>
  );
});

Anchor.displayName === "Anchor";
