import type { ComponentProps, FC } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  name: string;
  prefix?: string;
  error?: string;
};

export const Input: FC<InputProps> = (props) => {
  return (
    <div className="block">
      <label htmlFor={props.name}>
        <div className="ml-4 block text-sm font-bold text-gray-500">{props.label}</div>
        <div className="relative">
          {props.prefix ? (
            <span className="absolute left-5 flex h-full items-center font-bold">{props.prefix}</span>
          ) : null}
          <input
            type="text"
            id={props.name}
            className={`mt-0.5 h-10 w-full rounded-full border-none bg-gray-100 py-6 pr-5 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:focus:bg-gray-600 ${
              props.prefix ? "pl-10" : "pl-5"
            }`}
            autoComplete="off"
            {...props}
          />
        </div>
      </label>
      {props.error ? <p className="ml-4 mt-0.5 text-sm text-red-500">{props.error}</p> : null}
    </div>
  );
};
