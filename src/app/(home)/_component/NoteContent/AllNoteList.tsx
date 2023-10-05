import { tv } from "tailwind-variants";

import { NoteList } from "@/app/(home)/_component/NoteContent/NoteList";
import { type NoteListsType } from "@/lib/memo/type";

const allNoteList = tv({
  slots: {
    base: "p-4",
    body: "text-lg opacity-70 text-indigo-12 dark:text-indigodark-12",
  },
});

export const AllNoteList = (props: NoteListsType) => {
  const { notes } = props;
  const { base, body } = allNoteList();

  return (
    <main className={base()}>
      {notes.length !== 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={body()}>メモが見つかりませんでした！</p>
      )}
    </main>
  );
};
