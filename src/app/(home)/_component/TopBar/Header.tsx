import { type FC } from "react";
import Link from "next/link";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { NoteWriteButton } from "@/app/(home)/_component/Note/NoteWriteButton";
import { UserMenu } from "@/app/(home)/_component/TopBar/UserMenu";
import { Anchor } from "@/component/Button/Anchor";
import { ICON_SIZE } from "@/lib/const/constants";

export type HeaderProps = { isHeaderNarrow?: boolean };

export const Header: FC<HeaderProps> = (props) => {
  const { isHeaderNarrow } = props;

  return (
    <header
      className={`mx-auto flex items-center justify-between px-3 sm:px-4 ${
        isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"
      }`}
    >
      <Link href="/" className="text-xl font-bold">
        Memo
      </Link>

      <div className="flex h-10 items-center space-x-2 sm:space-x-3">
        <Anchor href="/search" variant="ghost" className={ICON_SIZE}>
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Anchor>
        <UserMenu />
        <NoteWriteButton />
      </div>
    </header>
  );
};
