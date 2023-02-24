import Link from "next/link";
import type { FC } from "react";
import type { ListNoteType } from "src/types/types";

type NoteListItemProps = { note: ListNoteType };

// タイトルの取得（改行コードまでをタイトルとする）
const pattarn = "(^.*)(\n)";
const getTitle = (excTitle: RegExpMatchArray | null) => {
  return String(excTitle ? excTitle[0] : "");
};

export const NoteListItem: FC<NoteListItemProps> = (props) => {
  const title = getTitle(props.note.excerpt.match(pattarn));

  return (
    <Link href={`/memos/${props.note.id}`} legacyBehavior>
      <a className="block w-full rounded-xl bg-gray-100 py-3 px-4 shadow dark:bg-gray-700 sm:px-6">
        <div className="truncate text-sm font-bold sm:text-base">{title}</div>
        <div className="mt-0.5 truncate text-sm">{props.note.excerpt.replace(title, "")}</div>

        <div className="mt-4 flex items-center justify-between">
          <time className="text-sm font-bold text-gray-400">{props.note.updatedOn}</time>
          {props.note.public ? (
            <div className="rounded-full bg-orange-400 py-1 px-2.5 text-xs font-bold text-white">公開中</div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
