import { NoteHeader } from "@/app/memo/[noteId]/_component/Header";

const NoteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      <NoteHeader />
      <main className="mx-auto w-full max-w-screen-sm px-4">{children}</main>
    </div>
  );
};

export default NoteLayout;
