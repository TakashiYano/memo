"use client";

import { type FC } from "react";

import { tv } from "tailwind-variants";

import { Button } from "@/component/Button";
import { List } from "@/component/List/List";

const list = tv({
  slots: {
    container: "space-y-4 border-b border-indigo-6 dark:border-indigodark-6",
  },
});

export const DeleteAccount: FC = () => {
  const { container } = list();

  const handleDeleteMemo = () => {
    // TODO:Memo削除
    alert("未実装");
  };

  return (
    <div className={container()}>
      <h1 className="text-xl font-bold text-indigo-11 dark:text-indigodark-11">サービス削除</h1>

      <List
        items={[
          {
            button: (
              <Button
                variant="error"
                className="px-4 py-2 text-sm text-red-11 dark:text-reddark-11"
                onClick={handleDeleteMemo}
              >
                削除する
              </Button>
            ),
            label: <div className="ml-3 flex-1 font-bold">Memoデータ</div>,
          },
        ]}
      />
    </div>
  );
};
