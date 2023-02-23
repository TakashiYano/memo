import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputSearch: FC<Props> = (props) => {
  return (
    <div>
      <MagnifyingGlassIcon className="mr-2 h-6 w-6 text-blue-500" />
      <input type="text" {...props} className="m-0 my-auto w-full border-white bg-gray-100 p-0 outline-none" />
    </div>
  );
};
