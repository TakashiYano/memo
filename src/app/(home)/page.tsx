import { AllNoteList } from "@/app/(home)/_component/NoteContent/AllNoteList";
import { getLabels } from "@/lib/supabase/label";
import { getNotes } from "@/lib/supabase/note";
import { getProfile } from "@/lib/supabase/user";

export const metadata = {
  title: "Home",
};

export const fetchCache = "only-no-store";

const Home = async () => {
  const notes = await getNotes();
  const availableLabels = await getLabels();
  const profile = await getProfile();
  if (!profile) {
    return null;
  }

  return <AllNoteList notes={notes} availableLabels={availableLabels} profile={profile} />;
};

export default Home;
