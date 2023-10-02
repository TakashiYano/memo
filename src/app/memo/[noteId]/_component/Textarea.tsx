"use client";

import {
  useCallback,
  useRef,
  useTransition,
  type ChangeEventHandler,
  type FocusEventHandler,
} from "react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useDebouncedCallback } from "use-debounce";

import { format_hhmma } from "@/lib/memo/date";
import { type NoteWithUserType } from "@/lib/memo/type";
import { type Database } from "@/lib/supabase/type";

export const Textarea = (props: NoteWithUserType) => {
  const { note } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const { handleBlur, handleChange, isPending } = useNote({ note });

  // TODO:ブラウザバック時の対応

  return (
    <label htmlFor="memo" className="block">
      <div className="text-sm font-light opacity-70">
        {isPending ? `Last Saved ${format_hhmma(note.updated_at ?? "")}` : "Saved"}
      </div>
      <ReactTextareaAutosize
        ref={ref}
        id="memo"
        className="w-full resize-none border-none bg-transparent text-lg leading-loose focus:ring-0"
        defaultValue={note.content ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
        autoFocus={note.content === ""}
      />
    </label>
  );
};

const useNote = (props: NoteWithUserType) => {
  const { note } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  return { handleBlur, handleChange, isPending };
};
