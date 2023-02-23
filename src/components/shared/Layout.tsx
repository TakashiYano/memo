import type { FC, ReactNode } from "react";
import type { HeaderProps } from "src/components/shared/Header";
import { Header } from "src/components/shared/Header";

type Props = HeaderProps & {
  children: ReactNode;
  isHeaderNarrow?: boolean;
};

export const Layout: FC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, isHeaderNarrow, ...headerProps } = props;

  return (
    <div className="pb-20">
      <div
        className={`mx-auto px-3 pt-4 pb-8 sm:px-4 sm:pb-14 ${isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"}`}
      >
        <Header {...headerProps} />
      </div>
      <div className="mx-auto w-full max-w-screen-sm px-4">{children}</div>
    </div>
  );
};
