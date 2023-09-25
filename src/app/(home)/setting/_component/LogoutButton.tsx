"use client";

import { type FC } from "react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/lib/user/useAuth";

export const LogoutButton: FC = () => {
  const { handleSignOut } = useAuth();

  return (
    <button
      type="button"
      className="-mx-4 flex items-center px-4 py-3 text-lg font-bold hover:bg-red-4 focus:outline-none  focus-visible:bg-red-4 dark:hover:bg-reddark-4 dark:focus-visible:bg-red-4"
      onClick={handleSignOut}
    >
      <div className="flex shrink-0 items-center justify-center">
        <ArrowLeftOnRectangleIcon className="ml-0.5 h-7 w-7 text-red-11 dark:text-reddark-11" />
      </div>
      <p className="ml-4 font-bold text-red-11 dark:text-reddark-11">ログアウト</p>
    </button>
  );
};
