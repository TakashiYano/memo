import { type FC } from "react";
import Link from "next/link";

import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type ListNoteType } from "@/lib/memo/type";

export const NoteListItem: FC<ListNoteType> = (props) => {
  const { excerpt, id, updatedAt } = props;
  const [first, second] = getFirstAndSecondLine(excerpt);

  return (
    <Link href={`/memo/${id}`} legacyBehavior>
      <a className="block w-full rounded-xl bg-gray-100 px-4 py-3 shadow dark:bg-gray-700 sm:px-6">
        <div>
          <h1 className="truncate text-sm font-bold leading-relaxed sm:text-base">{first}</h1>
          <p className="truncate text-sm leading-relaxed">{second}</p>
        </div>
        <div className="mt-4 flex h-6 items-end justify-between">
          <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
            {format_yyyyMd(updatedAt)}
          </time>
        </div>
      </a>
    </Link>
  );
};
