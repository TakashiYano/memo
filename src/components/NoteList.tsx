import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import { NoteListItem } from "src/components/NoteListItem";
import { Button } from "src/components/shared/Button";
import { Error } from "src/components/shared/Error";
import type { ListNoteType } from "src/type/types";
import type { SWRResponse } from "swr";
import useSWR from "swr";

type NoteListProps = SWRResponse<ListNoteType[], any>;

const NoteList: FC<NoteListProps> = (props) => {
  if (props.error) {
    return <Error />;
  }

  if (!props.data) {
    return (
      <ul className="space-y-5">
        {[1, 2, 3, 4, 5].map((v) => {
          return (
            <li
              key={v}
              className="w-full animate-pulse rounded-xl bg-gray-100 px-4 py-3 shadow dark:bg-gray-700 sm:px-6"
            >
              <div className="flex items-center space-x-8">
                <div className="flex flex-1 flex-col">
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-600"></div>
                  <div className="mt-3 h-4 rounded bg-gray-200 dark:bg-gray-600"></div>
                  <div className="mt-6 flex h-4 justify-between">
                    <div className="w-1/6 rounded bg-gray-200 dark:bg-gray-600"></div>
                    <div className="w-1/6 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                  </div>
                </div>
                <Button variant="ghost" className="h-8 w-8">
                  <ChevronDownIcon />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (props.data.length === 0) {
    return <div>メモは見つかりませんでした。</div>;
  }

  return (
    <ul className="space-y-5">
      {props.data.map((note) => {
        return (
          <li key={note.id} className="rounded-xl bg-gray-100 px-4 py-3 shadow dark:bg-gray-700 sm:px-6">
            <NoteListItem note={note} />
          </li>
        );
      })}
    </ul>
  );
};

export const UserNoteList: FC<{ userId: string }> = (props) => {
  const res = useSWR<ListNoteType[]>(`/users/${props.userId}/notes`);
  return <NoteList {...res} />;
};

export const SearchNoteList: FC<{ userId: string; keyword: string }> = (props) => {
  const res = useSWR(`/users/${props.userId}/notes/search/${props.keyword}`);
  return <NoteList {...res} />;
};
