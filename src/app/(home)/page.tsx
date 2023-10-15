import { AllNoteList } from "@/app/(home)/_component/NoteContent/AllNoteList";
import { getNotes } from "@/lib/supabase/note";

export const metadata = {
  title: "Home",
};

export const fetchCache = "only-no-store";

const Home = async () => {
  const notes = await getNotes();

  return <AllNoteList notes={notes} />;
};

export default Home;
