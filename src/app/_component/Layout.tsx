/* eslint-disable func-style */
import type { FC, ReactNode } from "react";

import { Header, type HeaderProps } from "./Header";

type Props = HeaderProps & { children: ReactNode; isHeaderNarrow?: boolean };

export const Layout: FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      <Header {...rest} />
      <main className="mx-auto w-full max-w-screen-sm px-4">{children}</main>
    </div>
  );
};
