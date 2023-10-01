import { notFound } from "next/navigation";

import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteEditor";
import { createClient } from "@/lib/supabase/supabase-server";

export const revalidate = 60;

const getNote = async (noteId: string) => {
  const supabase = createClient();
  const { data: note, error } = await supabase
    .from("memo_notes")
    .select("id, content, updated_at")
    .eq("id", noteId)
    .single();

  if (!note) {
    notFound();
  }

  if (error) {
    throw new Error("Failed to fetch memo");
  }

  return note;
};

const NotePage = async ({ params: { noteId } }: { params: { noteId: string } }) => {
  const notePromise = getNote(noteId);

  const [note] = await Promise.all([notePromise]);

  return (
    <div className="flex h-[calc(100vh-168px)] flex-col sm:h-[calc(100vh-192px)]">
      <NoteEditor note={note} />
    </div>
  );
};

export default NotePage;
