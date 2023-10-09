import { forwardRef, type ComponentProps, type ForwardedRef } from "react";

type InputProps = ComponentProps<"input"> & {
  error?: string;
  label?: string;
  prefix?: string;
  required?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error, label, prefix, required, ...rest } = props;

  return (
    <div className="block">
      <label htmlFor={rest.id}>
        <div className="ml-4 block text-sm font-bold text-indigo-12 dark:text-indigodark-12">
          {label}
          <div className="inline-block text-red-11 dark:text-reddark-11">{required && "*"}</div>
        </div>
        <div className="relative">
          {prefix ? (
            <span className="absolute left-5 flex h-full items-center font-bold">{prefix}</span>
          ) : null}
          <input
            type="text"
            ref={ref as ForwardedRef<HTMLInputElement>}
            id={rest.id}
            className={`mt-0.5 h-10 w-full rounded-xl border bg-indigo-3 py-6 pr-5 font-bold focus:outline-none focus:ring-2 dark:bg-indigodark-3 ${
              prefix ? "pl-10" : "pl-5"
            } ${
              error
                ? "border-red-6 focus:ring-red-11 dark:border-reddark-6 dark:focus:ring-reddark-11"
                : "border-indigo-6 focus:ring-indigo-11 dark:border-indigodark-6 dark:focus:ring-indigodark-11"
            }`}
            autoComplete="off"
            {...rest}
          />
        </div>
      </label>
      {error ? (
        <p className="ml-4 mt-0.5 text-sm text-red-11 dark:text-reddark-11">{error}</p>
      ) : null}
    </div>
  );
});

Input.displayName === "Input";
