import type { ChangeEvent } from "react";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/type/types";
import { useDebouncedCallback } from "use-debounce";

export const NoteEditor = (props: NoteType) => {
  const debounced = useDebouncedCallback(async (value) => {
    try {
      // TODO: メモ更新処理を追加
      alert(value.trim());
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

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        id="memo"
        style={{ caretColor: "#3B82F6" }}
        className="w-full resize-none border-none bg-transparent text-lg focus:ring-0 sm:text-xl"
        defaultValue={props.content}
        onChange={handleChange}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
      />
    </label>
  );
};
