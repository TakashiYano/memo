"use client";

import { useCallback } from "react";

import { TrashIcon } from "@heroicons/react/20/solid";

import { Button } from "@/component/Button";

type LabelListItemProps = {
  color: string;
  id: string;
  name: string;
};

export const LabelListItem = (props: LabelListItemProps) => {
  const label = props;

  const handleEditLabel = useCallback(() => {
    // TODO：ラベル編集フォームを表示する
    alert("ラベル編集フォームを表示予定");
  }, []);

  const handleDeleteLabel = useCallback(() => {
    // TODO：ラベル削除処理の実装
    alert("ラベル削除処理を実装予定");
  }, []);

  return (
    <div className="bg-indigo-3 px-4 py-2 hover:bg-indigo-4 group-first:rounded-t-xl group-last:rounded-b-xl dark:bg-indigodark-3 dark:hover:bg-indigodark-4">
      <div className="flex items-center justify-between">
        <Button
          className="flex items-center gap-x-2 bg-indigo-9 p-2 dark:bg-indigodark-9"
          onClick={handleEditLabel}
        >
          <div
            className="h-5 w-5 rounded-full border-none"
            style={{ backgroundColor: `${label.color}` }}
          />
          <span className="text-xs text-indigo-12 dark:text-indigodark-12">{label.name}</span>
        </Button>
        <Button className="p-2" variant="outline" onClick={handleDeleteLabel}>
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
