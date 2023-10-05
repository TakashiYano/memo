import { NoteListItem } from "@/app/(home)/_component/NoteContent/NoteListItem";
import { type NoteDisplayType } from "@/lib/memo/type";

type NoteListProps = { notes: NoteDisplayType[] };

export const NoteList = (props: NoteListProps) => {
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
