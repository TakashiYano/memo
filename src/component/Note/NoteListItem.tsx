/* eslint-disable func-style */
import type { FC } from "react";
import Link from "next/link";

import type { ListNoteType } from "src/lib/memo";
import { format_yyyyMd, getFirstAndSecondLine } from "src/pages-component/memo";

export const NoteListItem: FC<ListNoteType> = (props) => {
  const { excerpt, id, isPublic, updatedAt } = props;
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
          {isPublic ? (
            <div className="grid h-full place-content-center rounded-full bg-orange-400 px-2.5 text-xs font-bold text-white">
              ラベル
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
