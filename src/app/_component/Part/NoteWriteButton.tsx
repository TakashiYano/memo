"use client";

import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { tv } from "tailwind-variants";

import { Button } from "@/component/Button";
import { useCreateNote } from "@/lib/memo/useCreateNote";
import { type ProfileIdType } from "@/lib/profile/type";

const button = tv({
  base: "w-full text-indigo-12 dark:text-indigodark-12",
});

export const NoteWriteButton = (props: ProfileIdType & { className: string }) => {
  const { className, profile } = props;
  const classes = button({ class: className });
  const { handleCreateMemo, isCreatingNote } = useCreateNote({ profile });

  return (
    <Button
      type="button"
      key="write note"
      variant="solid"
      onClick={handleCreateMemo}
      disabled={isCreatingNote}
      className={classes}
    >
      <PencilSquareIcon className="h-5 w-5" />
      <p className="text-lg">メモを書く</p>
    </Button>
  );
};
