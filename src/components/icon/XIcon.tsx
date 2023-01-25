/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { FC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const XIcon: FC<Props> = (props) => {
  return (
    <svg
      className={cc([
        {
          "text-gray-500": props.disabled,
        },
        props.className,
      ])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

// Propsのデフォルト値
XIcon.defaultProps = {
  className: "w-5 h-5",
  disabled: false,
};
