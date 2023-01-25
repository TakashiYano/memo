/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import Image from "next/image";
import type { FC } from "react";
import { Button } from "src/components/shared/Button";

type CommonType = {
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

const ramdomMin = 1;
const ramdomMax = 3;

const ramdom = Math.floor(Math.random() * (ramdomMax + 1 - ramdomMin)) + ramdomMin;

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
    "rounded-full w-full h-full flex items-center justify-center",
    {
      "text-2xl": props.size === "small",
      "text-3xl": props.size === "medium",
      "text-4xl": props.size === "large",
      "text-5xl": props.size === "extralarge",
      "bg-red-100": ramdom === 1,
      "bg-blue-300": ramdom === 2,
      "bg-purple-300": ramdom === 3,
    },
  ]);

  return (
    <div className={circleStyle}>
      {isImg(props) ? (
        <Image src={props.src} alt={props.alt} width={500} height={500} className="rounded-full w-full h-full" />
      ) : (
        <Button button className={fontStyle}>
          <span className="m-auto">{props.alt ? props.alt.substring(0, 1) : null}</span>
        </Button>
      )}
    </div>
  );
};

// Propsのデフォルト値
Avatar.defaultProps = {
  size: "small",
};
