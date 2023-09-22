import { Fragment, memo } from "react";

import { UserMenu } from "./UserMenu";

/** @package */
export type Right = {
  right?: ("profile" | JSX.Element | undefined)[];
};

/** @package */
export const Right = memo<Right>((props) => {
  return (
    <div className="flex h-10 items-center space-x-2 sm:space-x-3">
      {props.right?.map((item, i) => {
        return <Fragment key={i}>{item === "profile" ? <UserMenu /> : item}</Fragment>;
      })}
    </div>
  );
});

Right.displayName = "Right";
