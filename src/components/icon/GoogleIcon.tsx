/* eslint-disable @typescript-eslint/naming-convention */
import classcat from "classcat";
import type { FC } from "react";

type Props = {
  className?: string;
  size?: "large" | "small";
};

export const GoogleIcon: FC<Props> = (props) => {
  const classes = classcat([
    {
      "w-6 h-6": props.size === "large",
      "w-5 h-5": props.size === "small",
    },
    props.className,
  ]);
  return (
    <svg className={classes} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5635 11.2525C21.5635 10.5047 21.5029 9.75296 21.3736 9.01733H10.998V13.2532H16.9396C16.6931 14.6194 15.9009 15.8279 14.7408 16.5959V19.3444H18.2856C20.3671 17.4285 21.5635 14.5992 21.5635 11.2525Z"
        fill="#4285F4"
      />
      <path
        d="M10.9978 22.0001C13.9646 22.0001 16.4665 21.026 18.2894 19.3445L14.7447 16.5961C13.7585 17.267 12.4853 17.647 11.0019 17.647C8.13215 17.647 5.69893 15.7109 4.82588 13.1079H1.16797V15.9413C3.03532 19.6558 6.83874 22.0001 10.9978 22.0001Z"
        fill="#34A853"
      />
      <path
        d="M4.82204 13.1078C4.36127 11.7416 4.36127 10.2623 4.82204 8.89611V6.06274H1.16817C-0.391995 9.17096 -0.391995 12.8329 1.16817 15.9411L4.82204 13.1078Z"
        fill="#FBBC04"
      />
      <path
        d="M10.9978 4.35312C12.5661 4.32887 14.0818 4.91899 15.2176 6.00221L18.3581 2.86167C16.3695 0.994313 13.7302 -0.0323263 10.9978 8.85519e-06C6.83874 8.85519e-06 3.03532 2.3443 1.16797 6.06284L4.82184 8.8962C5.69084 6.28919 8.1281 4.35312 10.9978 4.35312Z"
        fill="#EA4335"
      />
    </svg>
  );
};

// Propsのデフォルト値
GoogleIcon.defaultProps = {
  className: "",
  size: "small",
};
