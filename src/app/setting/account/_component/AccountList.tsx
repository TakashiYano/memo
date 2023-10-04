"use client";

import { type FC } from "react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { DeleteAccount } from "@/app/setting/account/_component/DeleteAccount";
import { ThemeList } from "@/app/setting/account/_component/ThemeList";
import { Button } from "@/component/Button/Button";
import { GoogleIcon } from "@/component/Icon/GoogleIcon";
import { List } from "@/component/List/List";
import { useAuth } from "@/lib/user/useAuth";

const list = tv({
  slots: {
    container: "space-y-4 border-b border-indigo-6 dark:border-indigodark-6",
  },
});

export const AccountList: FC = () => {
  const { container } = list();
  const { handleSignOut } = useAuth();

  const handleGoogle = () => {
    // TODO:Google連携
    alert("未実装");
  };

  return (
    <section className="space-y-4 p-4">
      <div className={container()}>
        <h2 className="text-xl font-bold text-indigo-11 dark:text-indigodark-11">テーマ変更</h2>
        <ThemeList />
      </div>

      <div className={container()}>
        <h2 className="text-xl font-bold text-indigo-11 dark:text-indigodark-11">アカウント連携</h2>

        <List
          items={[
            {
              button: (
                <Button variant="solid" className="px-4 py-2 text-sm" onClick={handleGoogle}>
                  解除する
                </Button>
              ),
              label: (
                <div className="ml-3 flex items-center space-x-3">
                  <GoogleIcon className="h-6 w-6" />
                  <div className="flex-1 font-bold">Google</div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <DeleteAccount />

      <Button
        variant="error"
        className="flex w-full gap-x-3 px-4 py-2 text-sm text-red-11 dark:text-reddark-11"
        onClick={handleSignOut}
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        ログアウト
      </Button>
    </section>
  );
};
