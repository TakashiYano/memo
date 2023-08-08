import type { NoteWithUserType } from "src/api/handler/note/type";

export const NoteViewer = (props: NoteWithUserType) => {
  return <p className="whitespace-pre-wrap text-lg leading-loose">{props.content}</p>;
};
