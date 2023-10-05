"use client";

import { type FC } from "react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";
import { useAuth } from "@/lib/user/useAuth";

export const LogoutButton: FC = () => {
  const { handleSignOut } = useAuth();

  return (
    <Button
      variant="error"
      className="flex w-full gap-x-3 px-4 py-2 text-sm text-red-11 dark:text-reddark-11"
      onClick={handleSignOut}
    >
      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      ログアウト
    </Button>
  );
};
