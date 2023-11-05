"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { SetLabelsControl } from "@/app/(home)/_component/NoteContent/SetLabelsControl";
import { Button } from "@/component/Button";
import { MenuDialog } from "@/component/Dialog/MenuDialog";
import { randomLabelColorHex } from "@/lib/label/labelColorObjects";
import { type Label } from "@/lib/label/type";
import { useSetPageLabels } from "@/lib/label/useSetPageLabels";
import { format_yyyyMd } from "@/lib/memo/date";
import { getFirstAndSecondLine } from "@/lib/memo/getFirstAndSecondLine";
import { type NoteDisplayType } from "@/lib/memo/type";
import { useDeleteNote } from "@/lib/memo/useDeleteNote";
import { useNoteDialog } from "@/lib/memo/useNoteDialog";
import { type ProfileIdType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

export type NoteListItemProps = { note: NoteDisplayType } & {
  availableLabels: Label[];
} & ProfileIdType;

export const NoteListItem = (props: NoteListItemProps) => {
  const [inputValue, setInputValue] = useState("");
  const [tabCount, setTabCount] = useState(-1);
  const [tabStartValue, setTabStartValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const errorTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const [highlightLastLabel, setHighlightLastLabel] = useState(false);
  const { availableLabels, note, profile } = props;
  const [labels, dispatchLabels] = useSetPageLabels(note.id);
  const [first, second] = getFirstAndSecondLine(note.content ?? "");
  const { handleDeleteNote } = useDeleteNote({ note });
  const { dispatch, isShowMenuDialog } = useNoteDialog();

  const handleShowMenuDialog = () => {
    dispatch({ type: "SHOW_MENU_DIALOG" });
  };

  const handleHideMenuDialog = () => {
    dispatch({ type: "HIDE_MENU_DIALOG" });
  };

  const showMessage = useCallback(
    (msg: string, timeout?: number) => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = undefined;
      }
      setErrorMessage(msg);
      if (timeout) {
        errorTimeoutRef.current = setTimeout(() => {
          setErrorMessage(undefined);
          if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = undefined;
          }
        }, timeout);
      }
    },
    [errorTimeoutRef]
  );

  useEffect(() => {
    const maxLengthMessage = "Max label length: 48 chars";

    if (inputValue.length >= 48) {
      showMessage(maxLengthMessage);
    } else if (errorMessage === maxLengthMessage) {
      setErrorMessage(undefined);
    }

    if (inputValue.length > 0) {
      setHighlightLastLabel(false);
    }
  }, [errorMessage, inputValue, showMessage]);

  const clearInputState = useCallback(() => {
    setTabCount(-1);
    setInputValue("");
    setTabStartValue("");
    setHighlightLastLabel(false);
  }, []);

  const createLabelAsync = useCallback(
    (newLabels: Label[], tempLabel: Label) => {
      async () => {
        const supabase = createClient();
        const currentLabels = newLabels;
        const { data: newLabel } = await supabase
          .from("labels")
          .insert({ color: tempLabel.color, name: tempLabel.name, user_id: profile.id })
          .select()
          .single();
        const idx = currentLabels.findIndex((l) => {
          return l.id === tempLabel.id;
        });
        if (newLabel) {
          toast.success(`Created label ${newLabel.name}`);
          if (idx !== -1) {
            currentLabels[idx] = newLabel;
            dispatchLabels({ labels: [...currentLabels], type: "SAVE" });
          } else {
            dispatchLabels({
              labels: [...currentLabels, newLabel],
              type: "SAVE",
            });
          }
        } else {
          showMessage(`Error creating label ${tempLabel.name}`, 5000);
          if (idx !== -1) {
            currentLabels.splice(idx, 1);
            dispatchLabels({ labels: [...currentLabels], type: "SAVE" });
          }
        }
      };
    },
    [dispatchLabels, showMessage, profile.id]
  );

  const selectOrCreateLabel = useCallback(
    (value: string) => {
      const current = labels.labels ?? [];
      const lowerCasedValue = value.toLowerCase();
      const existing = availableLabels.find((l) => {
        return l.name.toLowerCase() == lowerCasedValue;
      });

      if (lowerCasedValue.length < 1) {
        return;
      }

      if (existing) {
        const isAdded = labels.labels.find((l) => {
          return l.name.toLowerCase() == lowerCasedValue;
        });
        if (!isAdded) {
          dispatchLabels({ labels: [...current, existing], type: "SAVE" });
          clearInputState();
        } else {
          showMessage(`label ${value} already added.`, 5000);
        }
      } else {
        const tempLabel = {
          color: randomLabelColorHex(),
          createdAt: new Date(),
          description: "",
          id: uuidv4(),
          name: value,
        };
        const newLabels = [...current, tempLabel];
        dispatchLabels({ labels: newLabels, type: "TEMP" });
        clearInputState();

        createLabelAsync(newLabels, tempLabel);
      }
    },
    [availableLabels, dispatchLabels, clearInputState, showMessage, labels, createLabelAsync]
  );

  const deleteLastLabel = useCallback(() => {
    if (highlightLastLabel) {
      const current = labels.labels;
      current.pop();
      dispatchLabels({ labels: [...current], type: "SAVE" });
      setHighlightLastLabel(false);
    } else {
      setHighlightLastLabel(true);
    }
  }, [highlightLastLabel, dispatchLabels, labels]);

  return (
    <>
      <div className="group relative">
        <Link
          href={`/memo/${note.id}`}
          className="block w-full rounded-xl bg-indigo-3 px-4 py-3 shadow hover:bg-indigo-4 dark:bg-indigodark-3 dark:hover:bg-indigodark-4 sm:px-6"
        >
          <div>
            <h1 className="truncate text-sm font-bold leading-relaxed sm:text-base">{first}</h1>
            <p className="truncate text-sm leading-relaxed">{second}</p>
          </div>

          <div className="mt-4 flex h-6 items-end justify-between">
            <time className="space-x-4 text-sm font-bold tracking-wide text-indigo-11 dark:text-indigodark-11">
              {format_yyyyMd(note.updated_at ?? "")}
            </time>
          </div>
        </Link>

        <div className="absolute -top-2.5 right-0 hidden rounded-xl border border-indigo-6 bg-indigo-4 shadow group-hover:inline-block dark:border-indigodark-6 dark:bg-indigodark-4">
          <ul className="flex justify-end gap-x-2 px-2 opacity-70">
            <li className="hover:bg-indigo-5 dark:hover:bg-indigodark-5">
              <Button onClick={handleDeleteNote}>
                <TrashIcon className="h-5 w-5" />
              </Button>
            </li>
            <li className="hover:bg-indigo-5 dark:hover:bg-indigodark-5">
              <Button onClick={handleShowMenuDialog}>
                <TagIcon className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <MenuDialog show={isShowMenuDialog} onClose={handleHideMenuDialog}>
        <SetLabelsControl
          profile={profile}
          labels={availableLabels}
          inputValue={inputValue}
          setInputValue={setInputValue}
          clearInputState={clearInputState}
          selectedLabels={labels.labels}
          dispatchLabels={dispatchLabels}
          tabCount={tabCount}
          setTabCount={setTabCount}
          tabStartValue={tabStartValue}
          setTabStartValue={setTabStartValue}
          highlightLastLabel={highlightLastLabel}
          setHighlightLastLabel={setHighlightLastLabel}
          deleteLastLabel={deleteLastLabel}
          selectOrCreateLabel={selectOrCreateLabel}
          errorMessage={errorMessage}
        />
      </MenuDialog>
    </>
  );
};
