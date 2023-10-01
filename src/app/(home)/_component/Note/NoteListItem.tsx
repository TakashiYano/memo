import Link from "next/link";

import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type NoteListType } from "@/lib/memo/type";

export const NoteListItem = (props: NoteListType) => {
  const { note } = props;
  const [first, second] = getFirstAndSecondLine(note.content ?? "");

  return (
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
  );
};
