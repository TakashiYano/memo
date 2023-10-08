"use client";

import { useCallback, useTransition, type ChangeEventHandler, type FocusEventHandler } from "react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import { type NoteWithUserType } from "@/lib/memo/type";
import { type Database } from "@/lib/supabase/type";

export const useUpdateNote = (props: NoteWithUserType) => {
  const { note } = props;
  const router = useRouter();
  const [isUpdatingNote, startTransition] = useTransition();

  const saveNote = useCallback(
    async (value?: string) => {
      const supabase = createClientComponentClient<Database>();
      if (value && value === note.content) {
        return;
      }
      const { error } = await supabase
        .from("memo_notes")
        .update({ content: value ? value.trim() : "" })
        .eq("id", `${note.id}`);

      if (error) {
        return;
      }
    },
    [note]
  );

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await saveNote(value);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      saveNote(e.currentTarget.value);
    },
    [saveNote]
  );

  return { handleBlur, handleChange, isUpdatingNote };
};
