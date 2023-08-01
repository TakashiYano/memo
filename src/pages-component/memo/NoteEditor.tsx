import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/api/handler/note/type";
import { useDebouncedCallback } from "use-debounce";

/** @package */
export const NoteEditor = (props: NoteType) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const saveNote = useCallback(async (value: string) => {
    // TODO: メモ更新処理を追加
    // eslint-disable-next-line no-console
    console.log(value.trim());
  }, []);

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await saveNote(value);
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      return debounced(e.target.value);
    },
    [debounced]
  );

  const handleBlur = useCallback(async () => {
    if (ref.current?.value) {
      await saveNote(ref.current.value);
    }
  }, [saveNote]);

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (ref.current?.value && url === "/") {
        saveNote(ref.current.value);
      }
      return true;
    });
  }, [router, saveNote]);

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        ref={ref}
        id="memo"
        className="w-full resize-none border-none bg-transparent text-lg leading-loose focus:ring-0"
        defaultValue={props.content}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
      />
    </label>
  );
};
