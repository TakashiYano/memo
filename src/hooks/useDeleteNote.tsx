import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

export const useDeleteNote = () => {
  const router = useRouter();

  const deleteNote = useCallback(async () => {
    await alert("TODO: 削除処理の追加");
  }, []);

  const handleDeleteNote = useCallback(async () => {
    try {
      await toast.promise(deleteNote(), {
        loading: "処理中",
        success: "削除しました",
        error: "失敗しました",
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router]);

  return { handleDeleteNote };
};
