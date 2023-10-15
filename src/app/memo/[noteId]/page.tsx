import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteIdContent/NoteEditor";
import { NotePart } from "@/app/memo/[noteId]/_component/NoteIdNav/NotePart";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
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
