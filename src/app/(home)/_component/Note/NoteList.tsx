"use client";

import { type FC } from "react";

import { ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

import { NoteListItem } from "@/app/(home)/_component/Note/NoteListItem";
import { Button } from "@/component/Button/Button";
import { Error } from "@/component/Error/Error";
import { type ListNoteType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useDoubleCheck } from "@/lib/memo/useDoubleCheck";

type NoteListProps = { data?: ListNoteType[]; error?: Error };

export const NoteList: FC<NoteListProps> = (props) => {
  const { data, error } = props;
  const { handleDeleteNote } = useDeleteNote();
  const dc = useDoubleCheck();

  if (error) {
    return <Error />;
  }

  if (!data) {
    return (
      <ul className="space-y-5">
        {[1, 2, 3, 4, 5].map((v) => {
          return (
            <li
              key={v}
              className="w-full animate-pulse rounded-xl bg-indigo-2 p-4 shadow dark:bg-indigodark-2 sm:px-6"
            >
              <div className="h-3.5 w-3/4 rounded bg-indigo-3 dark:bg-indigodark-3 sm:h-4"></div>
              <div className="mt-2.5 h-3.5 rounded bg-indigo-3 dark:bg-indigodark-3"></div>
              <div className="mt-6 h-3.5 w-16 rounded bg-indigo-3 dark:bg-indigodark-3"></div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (data.length === 0) {
    return <div>メモは見つかりませんでした。</div>;
  }

  return (
    <ul className="space-y-5">
      {data.map((note) => {
        return (
          <li key={note.id}>
            <article className="flex items-center space-x-8">
              <NoteListItem {...note} />
              {dc.doubleCheck ? (
                <Button
                  key="delete"
                  variant="error"
                  className="flex-1 py-2 text-sm"
                  {...dc.getButtonProps()}
                  onClick={handleDeleteNote}
                >
                  <div className="flex items-center gap-1">
                    <ExclamationCircleIcon className="h-10 w-10" />
                    ARE YOU SURE?
                  </div>
                </Button>
              ) : (
                <Button
                  key="delete"
                  variant="error"
                  className="flex-1 py-2 text-sm"
                  {...dc.getButtonProps()}
                >
                  <div className="flex items-center gap-1">
                    <TrashIcon className="h-5 w-5" />
                    DELETE
                  </div>
                </Button>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
};
