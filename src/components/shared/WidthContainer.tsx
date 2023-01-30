import type { FC, ReactNode } from "react";

type WidthContainerProps = { children: ReactNode; className?: string };

export const WidthContainer: FC<WidthContainerProps> = (props) => {
  return (
    <div className={`px-4 mx-auto w-full max-w-screen-sm ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};
