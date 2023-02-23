import type { ComponentProps, FC } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  name: string;
  prefix?: string;
  error?: string;
};

export const Input: FC<InputProps> = (props) => {
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="ml-4 block text-sm font-bold text-gray-500">
        {props.label}
      </label>
      <div className="mt-0.5 flex rounded-full bg-gray-100 px-5 py-3 text-gray-800">
        {props.prefix ? <span className="pr-1 font-bold">{props.prefix}</span> : null}
        <input
          type="text"
          id={props.name}
          className="w-full bg-transparent font-bold outline-none"
          autoComplete="off"
          {...props}
        />
      </div>
      {props.error ? <p className="mt-1 text-sm text-red-600">{props.error}</p> : null}
    </div>
  );
};
