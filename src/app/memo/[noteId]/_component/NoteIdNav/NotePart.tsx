"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";
import { ConfirmDialog } from "@/component/Dialog/ConfirmDialog";
import { type NoteWithUserType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";

export const NotePart = (props: NoteWithUserType) => {
  const { note } = props;
  const router = useRouter();
  const { dispatch, isShowConfirmDialog } = useNoteDialog();
  const { handleDeleteNote, isDeletingNote } = useDeleteNote({ note });

  const handleShowConfirmDialog = () => {
    dispatch({ type: "SHOW_CONFIRM_DIALOG" });
  };

  const handleHideConfirmDialog = () => {
    dispatch({ type: "HIDE_CONFIRM_DIALOG" });
  };

  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem("prevPath");
    return prevPath ? router.back() : router.push("/");
  }, [router]);

  return (
    <>
      <div className="mx-auto flex items-center justify-between px-3 sm:px-4">
        <Button variant="ghost" className="h-10 w-10" onClick={handleClick}>
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button
          key="delete"
          variant="ghost"
          className="h-10 w-10"
          onClick={handleShowConfirmDialog}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>

      <ConfirmDialog
        show={isShowConfirmDialog}
        onClose={handleHideConfirmDialog}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
        disabled={isDeletingNote}
      />
    </>
  );
};
