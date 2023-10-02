import { notFound } from "next/navigation";

import { NoteHeader } from "@/app/memo/[noteId]/_component/Header";
import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteEditor";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const getNote = async (noteId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memo_notes")
    .select("id, content, updated_at")
    .eq("id", noteId)
    .single();

  if (!data) {
    notFound();
  }

  if (error) {
    throw new Error("メモ詳細の取得に失敗しました");
  }

  return data;
};

const NotePage = async ({ params: { noteId } }: { params: { noteId: string } }) => {
  const notePromise = getNote(noteId);

  const [note] = await Promise.all([notePromise]);

  return (
    <div className="space-y-4">
      <NoteHeader note={note} />
      <main className="mx-auto w-full max-w-screen-sm px-4">
        <NoteEditor note={note} />
      </main>
    </div>
  );
};

export default NotePage;
