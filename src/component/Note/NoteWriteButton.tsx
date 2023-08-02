import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button } from "src/component/Button";

/** @package */
export const NoteWriteButton = () => {
  const router = useRouter();

  const handleCreateMemo = useCallback(async () => {
    try {
      // TODO:新規メモ作成処理の実装
      await router.push(`/memo/new`);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  return (
    <Button key="write memo" variant="solid-blue" onClick={handleCreateMemo} className="h-10 px-4">
      メモを書く
    </Button>
  );
};
