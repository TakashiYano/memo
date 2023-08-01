import { memo } from "react";

/** @package */
export type Center = {
  center?: string | JSX.Element;
};

/** @package */
export const Center = memo<Center>((props) => {
  if (!props.center) {
    return null;
  }
  if (typeof props.center === "string") {
    return <div className="text-xl font-bold">{props.center}</div>;
  }
  return props.center;
});

Center.displayName = "Center";
