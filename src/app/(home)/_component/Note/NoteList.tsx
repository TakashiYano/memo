"use client";

import { NoteListItem } from "@/app/(home)/_component/Note/NoteListItem";
import { type NoteListsType } from "@/lib/memo/type";

export const NoteList = (props: NoteListsType) => {
  const { note: notes } = props;

  return (
    <ul className="space-y-5">
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <article className="flex items-center space-x-8">
              <NoteListItem note={note} />
            </article>
          </li>
        );
      })}
    </ul>
  );
};
