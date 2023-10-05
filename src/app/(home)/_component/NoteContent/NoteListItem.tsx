"use client";

import Link from "next/link";

import { TrashIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";
import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type NoteDisplayType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";

export type NoteListItemProps = { note: NoteDisplayType };

export const NoteListItem = (props: NoteListItemProps) => {
  const { note } = props;
  const [first, second] = getFirstAndSecondLine(note.content ?? "");
  const { handleDeleteNote } = useDeleteNote({ note });

  return (
    <Link
      href={`/memo/${note.id}`}
      className="group relative block w-full rounded-xl bg-indigo-3 px-4 py-3 shadow hover:bg-indigo-4 dark:bg-indigodark-3 dark:hover:bg-indigodark-4 sm:px-6"
    >
      <div className="absolute -top-2.5 right-0 hidden rounded-xl border border-indigo-6 bg-indigo-4 shadow group-hover:inline-block dark:border-indigodark-6 dark:bg-indigodark-4">
        <ul className="flex justify-end gap-x-2 px-2 opacity-70">
          <li className="hover:bg-indigo-5 dark:hover:bg-indigodark-5">
            <Button onClick={handleDeleteNote}>
              <TrashIcon className="h-5 w-5" />
            </Button>
          </li>
        </ul>
      </div>

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
  );
};
