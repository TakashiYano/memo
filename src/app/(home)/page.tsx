import { AllNoteList } from "@/app/(home)/_component/NoteContent/AllNoteList";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Home",
};

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

  return <AllNoteList notes={notes} />;
};

export default Home;
