import { forwardRef, type ForwardedRef } from "react";
import Link from "next/link";

import type { AnchorType } from "./type";
import { useButtonClass } from "./useButtonClass";

export const Anchor = forwardRef<HTMLAnchorElement, AnchorType>((props, ref) => {
  const { children, className, variant, ...rest } = props;
  const classes = useButtonClass(className, variant);
  return (
    <Link {...rest} legacyBehavior>
      <a ref={ref as ForwardedRef<HTMLAnchorElement>} className={classes}>
        {children}
      </a>
    </Link>
  );
});

Anchor.displayName === "Button";
