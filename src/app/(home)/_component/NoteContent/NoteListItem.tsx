"use client";

import Link from "next/link";

import { TagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { SetLabelsControl } from "@/app/(home)/_component/NoteContent/SetLabelsControl";
import { Button } from "@/component/Button";
import { MenuDialog } from "@/component/Dialog/MenuDialog";
import { type Label } from "@/lib/label/type";
import { useSetLabel } from "@/lib/label/useSetLabel";
import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type NoteDisplayType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";
import { type ProfileIdType } from "@/lib/profile/type";

export type NoteListItemProps = {
  availableLabels: Label[];
  note: NoteDisplayType;
  selectedLabels: Label[];
} & ProfileIdType;

export const NoteListItem = (props: NoteListItemProps) => {
  const { availableLabels, note, profile, selectedLabels } = props;
  const { handleDeleteNote } = useDeleteNote({ note });
  const { dispatch, isShowMenuDialog } = useNoteDialog();
  const [first, second] = getFirstAndSecondLine(note.content ?? "");
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

  return (
    <>
      <div className="group relative">
        <Link
          href={`/memo/${note.id}`}
          className="block w-full rounded-xl bg-indigo-3 px-4 py-3 shadow hover:bg-indigo-4 dark:bg-indigodark-3 dark:hover:bg-indigodark-4"
        >
          <h1 className="truncate text-sm font-bold leading-relaxed sm:text-base">{first}</h1>
          <p className="truncate text-sm leading-relaxed">{second}</p>
          <time className="space-x-4 text-sm font-bold tracking-wide text-indigo-11 dark:text-indigodark-11">
            {format_yyyyMd(note.updated_at ?? "")}
          </time>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedLabels.map((label) => {
              return (
                <div
                  key={label.id}
                  className="flex flex-row items-center justify-around gap-1.5 rounded-xl border-indigo-6 bg-indigo-9 px-2 py-0.5 dark:border-indigodark-6 dark:bg-indigodark-9"
                >
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: `${label.color}` }}
                  />
                  <span className="text-xs text-indigo-12 dark:text-indigodark-12">
                    {label.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Link>

        <div className="absolute -top-2.5 right-0 hidden rounded-xl border border-indigo-6 bg-indigo-4 shadow group-hover:inline-block dark:border-indigodark-6 dark:bg-indigodark-4">
          <ul className="flex justify-end gap-x-2 px-2 opacity-70">
            <li className="hover:bg-indigo-5 dark:hover:bg-indigodark-5">
              <Button onClick={handleDeleteNote}>
                <TrashIcon className="h-5 w-5" />
              </Button>
            </li>
            <li className="hover:bg-indigo-5 dark:hover:bg-indigodark-5">
              <Button onClick={handleShowMenuDialog}>
                <TagIcon className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </div>
      </div>

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
