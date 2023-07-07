import { Fragment, memo } from "react";
import { UserMenu } from "src/components/shared/Header/UserMenu";

/** @package */
export type Right = {
  right?: ("profile" | JSX.Element)[];
};

/** @package */
export const Right = memo<Right>((props) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {props.right?.map((item, i) => {
        return <Fragment key={i}>{item === "profile" ? <UserMenu /> : item}</Fragment>;
      })}
    </div>
  );
});

Right.displayName = "Right";
