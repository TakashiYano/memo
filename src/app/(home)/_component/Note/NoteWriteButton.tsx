"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/component/Button/Button";

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
      className="h-10 px-4"
      variant="solid"
      onClick={handleCreateMemo}
      disabled={isLoading}
    >
      メモを書く
    </Button>
  );
};
