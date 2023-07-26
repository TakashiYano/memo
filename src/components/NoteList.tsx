import { TrashIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { ConfirmDialog } from "src/components/Dialog";
import { NoteListItem } from "src/components/NoteListItem";
import { Button } from "src/components/shared/Button";
import { Error } from "src/components/shared/Error";
import { useDeleteNote, useNoteDialog } from "src/pages-component/memo";

type NoteListProps = { data?: ListNoteType[]; error?: Error };

export const NoteList: FC<NoteListProps> = (props) => {
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteDialog();
  const { handleDeleteNote } = useDeleteNote();

  if (props.error) {
    return <Error />;
  }

  if (!props.data) {
    return (
      <ul className="space-y-5">
        {[1, 2, 3, 4, 5].map((v) => {
          return (
            <li key={v} className="w-full animate-pulse rounded-xl bg-gray-100 p-4 shadow dark:bg-gray-700 sm:px-6">
              <div className="h-3.5 w-3/4 rounded bg-gray-200 dark:bg-gray-600 sm:h-4"></div>
              <div className="mt-2.5 h-3.5 rounded bg-gray-200 dark:bg-gray-600"></div>
              <div className="mt-6 h-3.5 w-16 rounded bg-gray-200 dark:bg-gray-600"></div>
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
          <li key={note.id}>
            <article className="flex items-center space-x-8">
              <NoteListItem {...note} />
              <Button key="delete" variant="ghost" className="h-10 w-10" onClick={handleOpenMenu}>
                <TrashIcon className="h-5 w-5" />
              </Button>
            </article>

            <ConfirmDialog
              show={isShowMenu}
              onClose={handleCloseMenu}
              onClickOk={handleDeleteNote}
              title="メモを削除"
              description="復元できませんがよろしいですか？"
              buttonText="削除する"
              buttonColor="red"
            />
          </li>
        );
      })}
    </ul>
  );
};
