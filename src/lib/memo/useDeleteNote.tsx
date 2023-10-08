"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { Button } from "@/component/Button";
import { type DeleteNoteListType, type NoteIdType } from "@/lib/memo/type";
import { createClient } from "@/lib/supabase/browser";

export const useDeleteNote = (props: NoteIdType) => {
  const { note } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const backNote = useCallback(async ({ deletedNote }: DeleteNoteListType) => {
    const supabase = createClient();
    await supabase.from("memo_notes").insert(deletedNote);
  }, []);

  const handleBackNote = useCallback(
    async ({ deletedNote }: DeleteNoteListType) => {
      try {
        await toast.promise(backNote({ deletedNote }), {
          error: "失敗しました",
          loading: "処理中",
          success: "復元しました",
        });
        startTransition(() => {
          router.refresh();
        });
      } catch (error) {
        console.error(error);
      }
    },
    [backNote, router]
  );

  const deleteNote = useCallback(async () => {
    const supabase = createClient();
    const { data: deletedNote } = await supabase
      .from("memo_notes")
      .delete()
      .eq("id", note.id)
      .select()
      .single();
    return deletedNote;
  }, [note.id]);

  const handleDeleteNote = useCallback(async () => {
    try {
      const deletedNote = await deleteNote();
      await toast.promise(
        deleteNote(),
        {
          error: "失敗しました",
          loading: "処理中",
          success: (
            <span className="flex items-center gap-x-2">
              <p>削除しました</p>
              <Button
                variant="ui"
                className="px-4 py-2 text-indigo-12 dark:text-indigodark-12"
                onClick={(event) => {
                  event.preventDefault();
                  toast.dismiss();
                  if (deletedNote) {
                    handleBackNote({ deletedNote });
                  }
                }}
              >
                復元する
              </Button>
            </span>
          ),
        },
        {
          success: { duration: 5000 },
        }
      );
      router.push("/");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router, handleBackNote]);

  return { deleteNote, handleDeleteNote, isPending };
};
