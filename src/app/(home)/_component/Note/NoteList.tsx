"use client";

import { NoteListItem } from "@/app/(home)/_component/Note/NoteListItem";
import { type NoteListsType } from "@/lib/memo/type";

export const NoteList = (props: NoteListsType) => {
  const { notes } = props;

  return (
    <ul className="space-y-4">
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <NoteListItem note={note} />
          </li>
        );
      })}
    </ul>
  );
};
