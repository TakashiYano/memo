import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/type/types";

export const NoteEditor = (props: NoteType) => {
  const [content, setContent] = useState(props.content);

  const handleChangeContent = useCallback(async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  }, []);

  return (
    <label htmlFor="memo" className="flex h-[calc(100vh-168px)] cursor-text sm:h-[calc(100vh-192px)]">
      <TextareaAutosize
        id="memo"
        style={{ caretColor: "#3B82F6" }}
        className="w-full resize-none border-none bg-transparent text-lg focus:ring-0 sm:text-xl"
        value={content}
        onChange={handleChangeContent}
        placeholder="メモを入力する"
        autoComplete="off"
      />
    </label>
  );
};
