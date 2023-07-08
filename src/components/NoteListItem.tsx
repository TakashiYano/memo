import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type FC, Fragment, useCallback } from "react";
import { Button } from "src/components/shared/Button";
import { format_yyyyMd } from "src/lib/date";
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
    <div className="flex items-center space-x-8">
      <Link href={`/memos/${props.note.id}`} legacyBehavior>
        <a className="block w-5/6 bg-gray-100 dark:bg-gray-700">
          <div className="flex flex-1 flex-col">
            <div className="w-3/4 truncate text-sm font-bold sm:text-base">{title}</div>
            <div className="mt-3 truncate text-sm">{props.note.excerpt.replace(title, "")}</div>

            <div className="mt-6 flex items-center justify-between">
              <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
                {format_yyyyMd(props.note.updatedOn)}
              </time>
              {props.note.public ? (
                <div className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-bold text-white dark:bg-gray-600">
                  ラベル
                </div>
              ) : null}
            </div>
          </div>
        </a>
      </Link>
      <ListMenu />
    </div>
  );
};

const ListMenu: FC = () => {
  const handleDeleteMemo = useCallback(() => {
    alert("未完成の機能です");
  }, []);

  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              <Button variant="ghost" className="h-8 w-8">
                <ChevronDownIcon />
              </Button>
            </Popover.Button>

            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute left-full z-10 mt-2 w-screen max-w-xs -translate-x-full transform pl-8 sm:max-w-sm sm:px-0 sm:pl-0 xl:-left-full xl:-translate-x-1/2 2xl:left-1/2"
                >
                  <div className="overflow-hidden rounded-2xl bg-white py-4 shadow-lg ring-1 ring-gray-400 ring-opacity-20 dark:bg-gray-800">
                    <div className="relative grid">
                      <Link href="/" legacyBehavior>
                        <a className="flex items-center px-4 py-2.5 hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700">
                          <div className="flex shrink-0 items-center justify-center">
                            <TagIcon className="h-7 w-7" />
                          </div>
                          <p className="ml-4 font-bold">ラベル</p>
                        </a>
                      </Link>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2.5 hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700"
                        onClick={handleDeleteMemo}
                      >
                        <div className="flex shrink-0 items-center justify-center">
                          <TrashIcon className="ml-0.5 h-7 w-7 text-red-500" />
                        </div>
                        <p className="ml-4 font-bold text-red-500">削除する</p>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
