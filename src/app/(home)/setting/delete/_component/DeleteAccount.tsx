"use client";

import { useCallback, type FC } from "react";

import { Button } from "@/component/Button/Button";
import { RecursiveList } from "@/component/List/RecursiveList";

export const DeleteAccount: FC = () => {
  const handleDeleteMemo = useCallback(() => {
    alert("Memoの削除");
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">データの削除</h1>

      <div className="mt-8">
        <RecursiveList
          list={[
            {
              items: [
                {
                  button: (
                    <Button
                      variant="solid-gray"
                      className="px-5 py-2 text-sm text-red-500"
                      onClick={handleDeleteMemo}
                    >
                      削除する
                    </Button>
                  ),
                  label: "Memoのデータを削除",
                },
              ],
              title: "サービスの削除",
            },
          ]}
        />
      </div>
    </div>
  );
};
