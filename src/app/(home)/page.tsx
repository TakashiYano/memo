import { NoteList } from "@/app/(home)/_component/Note/NoteList";
import { createClient } from "@/lib/supabase/supabase-server";

export const fetchCache = "only-no-store";

const getNotes = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memo_notes")
    .select()
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("メモ一覧の取得に失敗しました");
  }

  return data;
};

const Home = async () => {
  const notes = await getNotes();

  return (
    <main className="mx-auto w-full max-w-screen-sm px-4">
      {notes.length !== 0 ? (
        <NoteList note={notes} />
      ) : (
        <div className="space-y-5">メモが見つかりませんでした！</div>
      )}
    </main>
  );
};

export default Home;
