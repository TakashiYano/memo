import Link from "next/link";
import type { FC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { getFirstAndSecondLine } from "src/lib/const";
import { format_yyyyMd } from "src/lib/date";

/** @package */
export const NoteListItem: FC<ListNoteType> = (props) => {
  const [first, second] = getFirstAndSecondLine(props.excerpt);

  return (
    <Link href={`/memo/${props.id}`} legacyBehavior>
      <a>
        {first.length > 120 ? (
          <div className="line-clamp-2">
            <h1 className="text-sm leading-relaxed first-line:font-bold sm:first-line:text-base">{props.excerpt}</h1>
          </div>
        ) : (
          <div>
            <h1 className="truncate text-sm font-bold leading-relaxed sm:text-base">{first}</h1>
            <p className="truncate text-sm leading-relaxed">{second}</p>
          </div>
        )}
        <div className="mt-4 flex h-6 items-end justify-between">
          <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
            {format_yyyyMd(props.updatedAt)}
          </time>
          {props.public ? (
            <div className="grid h-full place-content-center rounded-full bg-orange-400 px-2.5 text-xs font-bold text-white">
              ラベル
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
