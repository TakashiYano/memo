/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { ComponentProps, FC } from "react";

type CommonType = {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  bgColor?: "white" | "gray";
  textColor?: "black" | "glay";
  startIcon?: JSX.Element;
};

type textareaType = CommonType & {
  multiline?: boolean;
  maxLength?: number;
  rows?: number;
  onChange?: ComponentProps<"textarea">["onChange"];
};

type inputType = CommonType & {
  onChange?: ComponentProps<"input">["onChange"];
};

// props の型がinput型かtextarea型かを判断する関数を定義する。
// props に multiline を持っている場合は true
const isTextarea = (props: textareaType | inputType): props is textareaType => {
  return "multiline" in props;
};

export const InputText: FC<textareaType | inputType> = (props) => {
  // テキストボックスにフォーカスがある場合にボーダーラインの表示を切り替える
  const divStyle = cc([
    "flex text-center my-auto pl-3 pr-10  rounded-xl border-2 transition-colors",
    {
      "bg-gray-200": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
      "h-10": !isTextarea(props),
    },
    props.className,
  ]);
  const inputStyle = cc([
    "w-full m-0 p-0 border-white outline-none my-auto",
    {
      "bg-gray-200": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
    },
  ]);

  const labelStyle = cc([
    {
      "text-black": props.textColor === "black",
      "text-gray-200": props.textColor === "glay",
    },
  ]);
  return (
    <div className="flex flex-col">
      {props.label ? (
        <div>
          <span className={labelStyle}>{props.label}</span>
        </div>
      ) : null}
      <div className={divStyle}>
        {/* 先頭にアイコンを表示する */}
        {props.startIcon ? props.startIcon : null}
        {/* 複数行表示と切り替える */}
        {isTextarea(props) ? (
          <textarea
            className={inputStyle}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            rows={props.rows}
            value={props.value}
          />
        ) : (
          <input type="text" className={inputStyle} placeholder={props.placeholder} value={props.value} />
        )}
      </div>
    </div>
  );
};

// Propsのデフォルト値
InputText.defaultProps = {
  bgColor: "gray",
  textColor: "black",
};
