import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { NoteWriteButton } from "@/app/(home)/_component/Note/NoteWriteButton";
import { Anchor } from "@/component/Button/Anchor";
import { ICON_SIZE } from "@/lib/const/constants";
import { type HeaderType } from "@/lib/user/type";

export const Header = (props: HeaderType) => {
  const { isHeaderNarrow, user } = props;

  return (
    <header
      className={`mx-auto flex items-center justify-between px-3 sm:px-4 ${
        isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"
      }`}
    >
      <div className="text-xl font-bold">Memo</div>

      <div className="flex h-10 items-center space-x-2 sm:space-x-3">
        <Anchor href="/search" variant="ghost" className={ICON_SIZE}>
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Anchor>
        <NoteWriteButton user={user} />
      </div>
    </header>
  );
};
