"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { type NoteListItemProps } from "@/app/(home)/_component/NoteContent/NoteListItem";
import { SetLabelsControl } from "@/app/(home)/_component/NoteContent/SetLabelsControl";
import { Button } from "@/component/Button";
import { ConfirmDialog } from "@/component/Dialog/ConfirmDialog";
import { MenuDialog } from "@/component/Dialog/MenuDialog";
import { useSetLabel } from "@/lib/label/useSetLabel";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";

export const NotePart = (props: NoteListItemProps) => {
  const { availableLabels, note, profile, selectedLabels } = props;
  const router = useRouter();
  const { dispatch, isShowConfirmDialog, isShowMenuDialog } = useNoteDialog();
  const { handleDeleteNote, isDeletingNote } = useDeleteNote({ note });
  const {
    clearInputState,
    deleteLastLabel,
    errorMessage,
    highlightLastLabel,
    inputValue,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  } = useSetLabel({ availableLabels, note, profile, selectedLabels });

  const handleShowMenuDialog = () => {
    dispatch({ type: "SHOW_MENU_DIALOG" });
  };

  const handleHideMenuDialog = () => {
    dispatch({ type: "HIDE_MENU_DIALOG" });
  };

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
        <div className="flex">
          <Button key="tag" variant="ghost" className="h-10 w-10" onClick={handleShowMenuDialog}>
            <TagIcon className="h-5 w-5" />
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
      <MenuDialog show={isShowMenuDialog} onClose={handleHideMenuDialog}>
        <SetLabelsControl
          note={note}
          profile={profile}
          labels={availableLabels}
          inputValue={inputValue}
          setInputValue={setInputValue}
          clearInputState={clearInputState}
          selectedLabels={selectedLabels}
          tabCount={tabCount}
          setTabCount={setTabCount}
          tabStartValue={tabStartValue}
          setTabStartValue={setTabStartValue}
          highlightLastLabel={highlightLastLabel}
          setHighlightLastLabel={setHighlightLastLabel}
          deleteLastLabel={deleteLastLabel}
          selectOrCreateLabel={selectOrCreateLabel}
          errorMessage={errorMessage}
        />
      </MenuDialog>
    </>
  );
};
