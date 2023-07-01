import cc from "classcat";
import type { FC, ImgHTMLAttributes } from "react";

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & { alt: string };

export const Avatar: FC<AvatarProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...otherProps } = props;

  return otherProps.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...otherProps} alt={otherProps.alt} className={cc(["rounded-full", className])} />
  ) : (
    <div className={cc(["grid place-items-center rounded-full bg-gray-200", className])}>
      {props.alt.substring(0, 1)}
    </div>
  );
};
