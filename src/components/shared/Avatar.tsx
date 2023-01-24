/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import Image from "next/image";
import type { FC } from "react";
import { Button } from "src/components/shared/Button";

type CommonType = {
  id: string;
  alt: string;
  className?: string;
  size?: "small" | "medium" | "large" | "extralarge";
  onClick?: (e: React.MouseEventHandler<HTMLElement>) => void;
};

type ImgType = CommonType & {
  src: string;
};

type ButtonType = CommonType;

// props の型がimage型かbutton型かを判断する関数を定義する。
// 画像ファイルがある場合にimgタブで表示する
const isImg = (props: ImgType | ButtonType): props is ImgType => {
  return "src" in props && props.src != "";
};

export const Avatar: FC<ImgType | ButtonType> = (props) => {
  // サイズ small:36px medium:48px large:72px extralarge:100px
  const circleStyle = cc([
    "relative m-2",
    {
      "w-9 h-9": props.size === "small",
      "w-12 h-12": props.size === "medium",
      "w-16 h-16": props.size === "large",
      "w-24 h-24": props.size === "extralarge",
    },
    props.className,
  ]);

  const fontStyle = cc([
    "rounded-full w-full h-full flex justify-items-center bg-blue-200",
    {
      "text-2xl": props.size === "small",
      "text-3xl": props.size === "medium",
      "text-4xl": props.size === "large",
      "text-5xl": props.size === "extralarge",
    },
  ]);

  return (
    <div className={circleStyle}>
      {isImg(props) ? (
        <Image src={props.src} alt={props.alt} className="rounded-full w-full h-full" />
      ) : (
        <Button id={`Avatar-${props.id}`} button className={fontStyle}>
          <span className="m-auto">{props.alt ? props.alt.substr(0, 1) : null}</span>
        </Button>
      )}
    </div>
  );
};

// Propsのデフォルト値
Avatar.defaultProps = {
  size: "small",
};
