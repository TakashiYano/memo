import Link from "next/link";
import type { FC } from "react";
import { format_yyyyMd } from "src/lib/date";
import type { ListNoteType } from "src/type/types";

const CHUNK_SIZE = 120; // Number of characters per line

// Get first and second line of string
const getFirstAndSecondLine = (str: string) => {
  const [first, second] = str.split("\n").filter(Boolean);
  if (first.length > CHUNK_SIZE) {
    return [str.slice(0, CHUNK_SIZE / 2), str.slice(CHUNK_SIZE / 2, str.length)];
  }
  return [first, second];
};

export const NoteListItem: FC<ListNoteType> = (props) => {
  const [first, second] = getFirstAndSecondLine(props.excerpt);

  return (
    <article>
      <Link href={`/memos/${props.id}`}>
        <a className="block w-full rounded-xl bg-gray-100 px-4 py-3 shadow dark:bg-gray-700 sm:px-6">
          <h1 className="truncate text-sm font-bold sm:text-base">{first}</h1>
          <p className="mt-0.5 truncate text-sm">{second || "\u00A0"}</p>
          <div className="mt-4 flex h-6 items-end justify-between">
            <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
              {format_yyyyMd(props.updatedOn)}
            </time>
            {props.public ? (
              <div className="grid h-full place-content-center rounded-full bg-orange-400 px-2.5 text-xs font-bold text-white">
                ラベル
              </div>
            ) : null}
          </div>
        </a>
      </Link>
    </article>
  );
};
