import { type ComponentProps, type FC } from "react";

type InputProps = ComponentProps<"input"> & {
  error?: string;
  label: string;
  name: string;
  prefix?: string;
};

export const Input: FC<InputProps> = (props) => {
  const { error, label, name, prefix } = props;

  return (
    <div className="block">
      <label htmlFor={name}>
        <div className="ml-4 block text-sm font-bold text-indigo-11 dark:text-indigodark-11">
          {label}
        </div>
        <div className="relative">
          {prefix ? (
            <span className="absolute left-5 flex h-full items-center font-bold">{prefix}</span>
          ) : null}
          <input
            type="text"
            id={name}
            className={`mt-0.5 h-10 w-full rounded-full border-none bg-indigo-3 py-6 pr-5 font-bold focus:outline-none focus:ring-2 focus:ring-blue-11 dark:bg-indigodark-3 dark:focus:bg-transparent ${
              prefix ? "pl-10" : "pl-5"
            }`}
            autoComplete="off"
            {...props}
          />
        </div>
      </label>
      {error ? (
        <p className="ml-4 mt-0.5 text-sm text-red-11 dark:text-reddark-11">{error}</p>
      ) : null}
    </div>
  );
};
