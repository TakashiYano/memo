"use client";

import Link from "next/link";

import { TagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";
import { MenuDialog } from "@/component/Dialog/MenuDialog";
import { MenuDialogList } from "@/component/Dialog/MenuDialogList";
import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type NoteDisplayType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";

export type NoteListItemProps = { note: NoteDisplayType };

export const NoteListItem = (props: NoteListItemProps) => {
  const { note } = props;
  const [first, second] = getFirstAndSecondLine(note.content ?? "");
  const { handleDeleteNote } = useDeleteNote({ note });
  const { dispatch, isShowMenuDialog } = useNoteDialog();

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
          className="block w-full rounded-xl bg-indigo-3 px-4 py-3 shadow hover:bg-indigo-4 dark:bg-indigodark-3 dark:hover:bg-indigodark-4 sm:px-6"
        >
          <div>
            <h1 className="truncate text-sm font-bold leading-relaxed sm:text-base">{first}</h1>
            <p className="truncate text-sm leading-relaxed">{second}</p>
          </div>

          <div className="mt-4 flex h-6 items-end justify-between">
            <time className="space-x-4 text-sm font-bold tracking-wide text-indigo-11 dark:text-indigodark-11">
              {format_yyyyMd(note.updated_at ?? "")}
            </time>
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
        <MenuDialogList menu={[]} />
      </MenuDialog>
    </>
  );
};
