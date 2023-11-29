"use client";

import { useRef } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";

import { type Label } from "@/lib/label/type";
import { format_hhmma } from "@/lib/memo/date";
import { type NoteWithUserType } from "@/lib/memo/type";
import { useUpdateNote } from "@/lib/memo/useUpdateNote";

type NoteEditorProps = NoteWithUserType & { selectedLabels: Label[] };

export const NoteEditor = (props: NoteEditorProps) => {
  const { note, selectedLabels } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const { handleBlur, handleChange, isUpdatingNote } = useUpdateNote({ note });

  return (
    <main className="mx-auto w-full max-w-screen-sm px-4">
      <label htmlFor="memo" className="block">
        <div className="mb-10 flex flex-wrap gap-1.5">
          {selectedLabels.map((label) => {
            return (
              <div
                key={label.id}
                className="flex flex-row items-center justify-around gap-1.5 rounded-xl border-indigo-6 bg-indigo-9 px-2 py-0.5 dark:border-indigodark-6 dark:bg-indigodark-9"
              >
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: `${label.color}` }}
                />
                <span className="text-xs text-indigo-12 dark:text-indigodark-12">{label.name}</span>
              </div>
            );
          })}
        </div>
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
