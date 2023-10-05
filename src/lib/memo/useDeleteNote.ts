"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { type NoteIdType } from "@/lib/memo/type";
import { createClient } from "@/lib/supabase/browser";

export const useDeleteNote = (props: NoteIdType) => {
  const { note } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteNote = useCallback(async () => {
    const supabase = createClient();
    await supabase.from("memo_notes").delete().eq("id", note.id);
  }, [note.id]);

  const handleDeleteNote = useCallback(async () => {
    try {
      await toast.promise(deleteNote(), {
        error: "失敗しました",
        loading: "処理中",
        success: "削除しました",
      });
      router.push("/");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router]);

  return { handleDeleteNote, isPending };
};
