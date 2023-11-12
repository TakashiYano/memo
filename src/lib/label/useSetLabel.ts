"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { type NoteListItemProps } from "@/app/(home)/_component/NoteContent/NoteListItem";
import { randomLabelColorHex } from "@/lib/label/labelColorObjects";
import { type Label } from "@/lib/label/type";
import { createClient } from "@/lib/supabase/browser";

export const useSetLabel = (props: NoteListItemProps) => {
  const [inputValue, setInputValue] = useState("");
  const [tabCount, setTabCount] = useState(-1);
  const [tabStartValue, setTabStartValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const errorTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const [highlightLastLabel, setHighlightLastLabel] = useState(false);
  const { availableLabels, note, profile, selectedLabels } = props;
  const router = useRouter();

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
    async (newLabels: Label[], tempLabel: Label) => {
      const supabase = createClient();
      const { data: newLabel } = await supabase
        .from("labels")
        .insert({ color: tempLabel.color, name: tempLabel.name, user_id: profile.id })
        .select()
        .single();
      if (newLabel) {
        await supabase.from("note_labels").insert({ label_id: newLabel.id, note_id: note.id });
        toast.success(`Created label ${newLabel.name}`);
        router.refresh();
      } else {
        showMessage(`Error creating label ${tempLabel.name}`, 5000);
      }
    },
    [showMessage, profile.id, note, router]
  );

  const selectOrCreateLabel = useCallback(
    async (value: string) => {
      const supabase = createClient();
      const current = selectedLabels ?? [];
      const lowerCasedValue = value.toLowerCase();
      const existing = availableLabels.find((l) => {
        return l.name.toLowerCase() == lowerCasedValue;
      });

      if (lowerCasedValue.length < 1) {
        return;
      }

      if (existing) {
        const isAdded = selectedLabels.find((l) => {
          return l.name.toLowerCase() == lowerCasedValue;
        });
        if (!isAdded) {
          await supabase.from("note_labels").insert({ label_id: existing.id, note_id: note.id });
          router.refresh();
          clearInputState();
        } else {
          showMessage(`label ${value} already added.`, 5000);
        }
      } else {
        const tempLabel = {
          color: randomLabelColorHex(),
          id: uuidv4(),
          name: value,
        };
        const newLabels = [...current, tempLabel];
        clearInputState();

        createLabelAsync(newLabels, tempLabel);
      }
    },
    [
      availableLabels,
      clearInputState,
      selectedLabels,
      createLabelAsync,
      note.id,
      showMessage,
      router,
    ]
  );

  const deleteLastLabel = useCallback(async () => {
    if (highlightLastLabel) {
      const label = selectedLabels[selectedLabels.length - 1];
      const supabase = createClient();
      await supabase.from("note_labels").delete().eq("label_id", label.id);
      router.refresh();
      setHighlightLastLabel(false);
    } else {
      setHighlightLastLabel(true);
    }
  }, [highlightLastLabel, selectedLabels, router]);

  return {
    clearInputState,
    deleteLastLabel,
    errorMessage,
    highlightLastLabel,
    inputValue,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  };
};
