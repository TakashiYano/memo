import { NoteListItem } from "@/app/(home)/_component/NoteContent/NoteListItem";
import { type Label } from "@/lib/label/type";
import { type NoteDisplayType } from "@/lib/memo/type";
import { type ProfileIdType } from "@/lib/profile/type";
import { getNoteLabels } from "@/lib/supabase/label";

type NoteListProps = { notes: NoteDisplayType[] } & { availableLabels: Label[] } & ProfileIdType;

export const NoteList = (props: NoteListProps) => {
  const { availableLabels, notes, profile } = props;

  return (
    <ul className="space-y-4">
      {notes.map((note) => {
        return (
          <NoteCard key={note.id} note={note} availableLabels={availableLabels} profile={profile} />
        );
      })}
    </ul>
  );
};

type NoteCardProps = { note: NoteDisplayType } & { availableLabels: Label[] } & ProfileIdType;

const NoteCard = async (props: NoteCardProps) => {
  const { availableLabels, note, profile } = props;
  const selectedLabels = await getNoteLabels(note.id);

  return (
    <li key={note.id}>
      <NoteListItem
        note={note}
        availableLabels={availableLabels}
        profile={profile}
        selectedLabels={selectedLabels}
      />
    </li>
  );
};
