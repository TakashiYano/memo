import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputSearch: FC<Props> = (props) => {
  return (
    <label className="relative block">
      <div className="absolute top-0 z-0 grid h-10 w-14 place-items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
      </div>
      <input
        type="text"
        {...props}
        className="m-0 my-auto h-10 w-full rounded-full border-none bg-gray-100 pl-12 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:focus:bg-transparent"
      />
    </label>
  );
};
