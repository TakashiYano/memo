import { type Metadata } from "next";

import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteIdContent/NoteEditor";
import { NotePart } from "@/app/memo/[noteId]/_component/NoteIdNav/NotePart";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { getNote } from "@/lib/supabase/note";

export const revalidate = 60;

export async function generateMetadata({
  params: { noteId },
}: {
  params: { noteId: string };
}): Promise<Metadata> {
  const note = await getNote(noteId);
  const [first, second] = getFirstAndSecondLine(note.content ?? "");

  return {
    description: `${first}. ${second}`,
    title: first,
  };
}

const NotePage = async ({ params: { noteId } }: { params: { noteId: string } }) => {
  const notePromise = getNote(noteId);
  const [note] = await Promise.all([notePromise]);

  return (
    <div className="space-y-4 pt-4">
      <NotePart note={note} />
      <NoteEditor note={note} />
    </div>
  );
};

export default NotePage;
