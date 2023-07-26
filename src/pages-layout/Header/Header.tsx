import type { FC } from "react";

import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";

/** @package */
export type HeaderProps = Left & Center & Right & { isHeaderNarrow?: boolean };

/** @package */
export const Header: FC<HeaderProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { isHeaderNarrow, left, center, right } = props;

  return (
    <header
      className={`mx-auto flex items-center px-3 sm:px-4 ${isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"}`}
    >
      <Left left={left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={center} />
      </div>

      <Right right={right} />
    </header>
  );
};
