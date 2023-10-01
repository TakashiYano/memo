import { Textarea } from "@/app/memo/[noteId]/_component/Textarea";
import { type NoteWithUserType } from "@/lib/memo/type";

export const NoteEditor = (props: NoteWithUserType) => {
  const { note } = props;

  return <Textarea note={note} />;
};
