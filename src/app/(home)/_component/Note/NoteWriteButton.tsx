"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button/Button";
import { ICON_SIZE } from "@/lib/const/constants";

export const NoteWriteButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMemo = useCallback(async () => {
    setIsLoading(true);

    try {
      // TODO:新規メモ作成処理の実装
      await router.push(`/memo/new`);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [router]);

  return (
    <Button
      key="write memo"
      className={ICON_SIZE}
      variant="ghost"
      onClick={handleCreateMemo}
      disabled={isLoading}
    >
      <PencilSquareIcon className="h-5 w-5" />
    </Button>
  );
};
