import { NoteList } from "@/app/(home)/_component/Note/NoteList";
import { createClient } from "@/lib/supabase/supabase-server";

export const fetchCache = "only-no-store";

async function getNotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("memo_notes").select();

  if (error) {
    throw new Error("Failed to fetch notes");
  }

  return data;
}

const Home = async () => {
  const notes = await getNotes();

  return (
    <div className="space-y-7 px-4">
      <NoteList note={notes} />
    </div>
  );
};

export default Home;
