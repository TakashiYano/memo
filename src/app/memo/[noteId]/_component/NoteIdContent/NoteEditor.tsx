"use client";

import { useRef } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";

import { format_hhmma } from "@/lib/memo/date";
import { type NoteWithUserType } from "@/lib/memo/type";
import { useUpdateNote } from "@/lib/memo/useUpdateNote";

export const NoteEditor = (props: NoteWithUserType) => {
  const { note } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const { handleBlur, handleChange, isUpdatingNote } = useUpdateNote({ note });

  return (
    <main className="mx-auto w-full max-w-screen-sm px-4">
      <label htmlFor="memo" className="block">
        <div className="text-sm font-light opacity-70">
          {isUpdatingNote ? `Last Saved ${format_hhmma(note.updated_at ?? "")}` : "Saved"}
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
    </main>
  );
};
