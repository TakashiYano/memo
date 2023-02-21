import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputSearch: FC<Props> = (props) => {
  return (
    <div>
      <MagnifyingGlassIcon className="mr-2 w-6 h-6 text-blue-500" />
      <input type="text" {...props} className="p-0 m-0 my-auto w-full bg-gray-100 border-white outline-none" />
    </div>
  );
};
