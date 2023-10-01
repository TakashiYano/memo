"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { createClient } from "@/lib/supabase/supabase-browser";
import { type NoteHeaderType } from "@/lib/user/type";

export const useDeleteNote = (props: NoteHeaderType) => {
  const { note } = props;
  const router = useRouter();

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
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router]);

  return { handleDeleteNote };
};
