import type { FC, ReactNode } from "react";
import type { HeaderProps } from "src/components/shared/Header";
import { Header } from "src/components/shared/Header";

type Props = HeaderProps & { children: ReactNode };

export const Layout: FC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, ...headerProps } = props;

  return (
    <div className="pb-20">
      <div className="px-3 pt-4 pb-8 mx-auto max-w-screen-lg sm:px-4 sm:pb-14">
        <Header {...headerProps} />
      </div>
      <div className="px-4 mx-auto w-full max-w-screen-sm">{children}</div>
    </div>
  );
};