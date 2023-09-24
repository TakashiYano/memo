"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button/Button";
import { ConfirmDialog } from "@/component/Dialog/ConfirmDialog";
import { ICON_SIZE } from "@/lib/const/constants";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";

export type HeaderProps = { isHeaderNarrow?: boolean };

export const NoteHeader: FC<HeaderProps> = (props) => {
  const { isHeaderNarrow } = props;
  const router = useRouter();
  const { handleCloseMenu, handleOpenMenu, isShowMenu } = useNoteDialog();
  const { handleDeleteNote } = useDeleteNote();

  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem("prevPath");
    return prevPath ? router.back() : router.push("/");
  }, [router]);

  return (
    <>
      <header
        className={`mx-auto flex items-center justify-between px-3 sm:px-4 ${
          isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"
        }`}
      >
        <Button variant="ghost" className={ICON_SIZE} onClick={handleClick}>
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button key="delete" variant="ghost" className={ICON_SIZE} onClick={handleOpenMenu}>
          <TrashIcon className="h-5 w-5" />
        </Button>
      </header>

      <ConfirmDialog
        show={isShowMenu}
        onClose={handleCloseMenu}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </>
  );
};
