/* eslint-disable func-style */
import type { FC } from "react";

import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";

export type HeaderProps = Left & Center & Right & { isHeaderNarrow?: boolean };

export const Header: FC<HeaderProps> = (props) => {
  const { center, isHeaderNarrow, left, right } = props;

  return (
    <header
      className={`mx-auto flex items-center px-3 sm:px-4 ${
        isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"
      }`}
    >
      <Left left={left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={center} />
      </div>

      <Right right={right} />
    </header>
  );
};
