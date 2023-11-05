import { tv } from "tailwind-variants";

import { NoteList } from "@/app/(home)/_component/NoteContent/NoteList";
import { type Label } from "@/lib/label/type";
import { type NoteListsType } from "@/lib/memo/type";
import { type ProfileIdType } from "@/lib/profile/type";

const allNoteList = tv({
  slots: {
    base: "p-4",
    body: "text-lg opacity-70 text-indigo-12 dark:text-indigodark-12",
  },
});

type AllNoteListProps = NoteListsType & { availableLabels: Label[] } & ProfileIdType;

export const AllNoteList = (props: AllNoteListProps) => {
  const { availableLabels, notes, profile } = props;
  const { base, body } = allNoteList();

  return (
    <main className={base()}>
      {notes.length !== 0 ? (
        <NoteList notes={notes} availableLabels={availableLabels} profile={profile} />
      ) : (
        <p className={body()}>メモが見つかりませんでした！</p>
      )}
    </main>
  );
};
