import { NoteEditor } from "@/app/memo/[noteId]/_component/NoteEditor";
import { type NoteWithUserType } from "@/lib/memo/type";

type Props = NoteWithUserType & { isEditable: boolean };

const NotePage = (props: Props) => {
  return (
    <div className="flex h-[calc(100vh-168px)] flex-col sm:h-[calc(100vh-192px)]">
      <NoteEditor {...props} />
    </div>
  );
};

export default NotePage;
