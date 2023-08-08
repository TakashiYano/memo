import type { NoteType } from "src/api/handler/note/type";

export const NoteViewer = (props: NoteType) => {
  return <p className="whitespace-pre-wrap text-lg leading-loose">{props.content}</p>;
};
