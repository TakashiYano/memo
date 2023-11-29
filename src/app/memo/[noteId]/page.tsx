import { type Metadata } from "next";

import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteIdContent/NoteEditor";
import { NotePart } from "@/app/memo/[noteId]/_component/NoteIdNav/NotePart";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { getLabels, getNoteLabels } from "@/lib/supabase/label";
import { getNote } from "@/lib/supabase/note";
import { getProfile } from "@/lib/supabase/user";

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

export const revalidate = 60;

const NotePage = async ({ params: { noteId } }: { params: { noteId: string } }) => {
  const notePromise = getNote(noteId);
  const availableLabelsPromise = getLabels();
  const profilePromise = getProfile();
  const selectedLabelsPromise = await getNoteLabels(noteId);
  const [note, availableLabels, profile, selectedLabels] = await Promise.all([
    notePromise,
    availableLabelsPromise,
    profilePromise,
    selectedLabelsPromise,
  ]);
  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-4 pt-4">
      <NotePart
        note={note}
        availableLabels={availableLabels}
        profile={profile}
        selectedLabels={selectedLabels}
      />
      <NoteEditor note={note} selectedLabels={selectedLabels} />
    </div>
  );
};

export default NotePage;
