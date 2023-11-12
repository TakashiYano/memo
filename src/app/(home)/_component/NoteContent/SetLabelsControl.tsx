"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckIcon, ExclamationCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

import { LabelsPicker } from "@/app/(home)/_component/NoteContent/LabelsPicker";
import { randomLabelColorHex } from "@/lib/label/labelColorObjects";
import { type Label } from "@/lib/label/type";
import { type NoteDisplayType } from "@/lib/memo/type";
import { type ProfileIdType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

export interface LabelsProvider {
  labels?: Label[];
}

type SetLabelsControlProps = {
  clearInputState: () => void;
  deleteLastLabel: () => void;
  errorMessage?: string;
  footer?: React.ReactNode;

  highlightLastLabel: boolean;
  inputValue: string;

  labels: Label[];
  selectedLabels: Label[];
  selectOrCreateLabel: (value: string) => void;

  setHighlightLastLabel: (set: boolean) => void;
  setInputValue: (value: string) => void;

  setTabCount: (count: number) => void;
  setTabStartValue: (value: string) => void;

  tabCount: number;

  tabStartValue: string;
};

type HeaderProps = SetLabelsControlProps & {
  focused: boolean;
  resetFocusedIndex: () => void;
};

const Header = (props: HeaderProps): JSX.Element => {
  const {
    clearInputState,
    deleteLastLabel,
    focused,
    highlightLastLabel,
    inputValue,
    labels,
    resetFocusedIndex,
    selectedLabels,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  } = props;

  return (
    <div className="my-0 flex w-full flex-col items-start justify-around">
      <div className="mb-1.5 mt-3 w-full px-4">
        <LabelsPicker
          labels={labels}
          focused={focused}
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedLabels={selectedLabels}
          tabCount={tabCount}
          setTabCount={setTabCount}
          tabStartValue={tabStartValue}
          setTabStartValue={setTabStartValue}
          highlightLastLabel={highlightLastLabel}
          setHighlightLastLabel={setHighlightLastLabel}
          onFocus={() => {
            resetFocusedIndex();
          }}
          clearInputState={clearInputState}
          deleteLastLabel={deleteLastLabel}
          selectOrCreateLabel={selectOrCreateLabel}
        />
      </div>
    </div>
  );
};

type LabelListItemProps = {
  focused: boolean;
  label: Label;
  selected: boolean;
  toggleLabel: (label: Label) => void;
};

const LabelListItem = (props: LabelListItemProps): JSX.Element => {
  const ref = useRef<HTMLLabelElement>(null);
  const { focused, label, selected, toggleLabel } = props;

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <label
      ref={ref}
      tabIndex={focused ? 0 : -1}
      onClick={(event) => {
        event.preventDefault();
        toggleLabel(label);
        ref.current?.blur();
      }}
      className={`flex h-10 w-full justify-start p-4 hover:bg-indigo-4 active:bg-indigo-5 dark:hover:bg-indigodark-4 dark:active:bg-indigodark-5 ${
        selected && "bg-indigo-5 dark:bg-indigodark-5"
      }`}
    >
      <input autoFocus={focused} type="hidden" checked={selected} readOnly />
      <div className="flex h-full w-8 items-center">
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${label.color}` }} />
      </div>
      <div className="flex h-full items-center text-clip">
        <p className="text-xs text-indigo-12 dark:text-indigodark-12">{label.name}</p>
      </div>
      <div className="ml-auto flex items-center pl-2.5">
        {selected && <CheckIcon className="h-5 w-5" />}
      </div>
    </label>
  );
};

type FooterProps = {
  availableLabels: Label[];
  createEnteredLabel: () => Promise<void>;
  filterText: string;
  focused: boolean;

  selectedLabels: Label[];
  selectEnteredLabel: () => Promise<void>;
};

const Footer = (props: FooterProps): JSX.Element => {
  const {
    availableLabels,
    createEnteredLabel,
    filterText,
    focused,
    selectedLabels,
    selectEnteredLabel,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  const textMatch: "selected" | "available" | "none" = useMemo(() => {
    const findLabel = (l: Label) => {
      return l.name.toLowerCase() == filterText.toLowerCase();
    };
    const available = availableLabels.find(findLabel);
    const selected = selectedLabels.find(findLabel);
    if (available && !selected) {
      return "available";
    }
    if (selected) {
      return "selected";
    }
    return "none";
  }, [filterText, availableLabels, selectedLabels]);

  const trimmedLabelName = useMemo(() => {
    return filterText.trim();
  }, [filterText]);

  return (
    <div ref={ref} className="flex h-10 w-full flex-row items-center justify-start">
      {trimmedLabelName.length > 0 ? (
        <button className="relative h-10 w-full border-t border-indigo-6 pl-6 hover:bg-indigo-4 active:bg-indigo-5 dark:border-indigodark-6 dark:hover:bg-indigodark-4 dark:active:bg-indigodark-5">
          <div
            className="flex cursor-pointer flex-row items-center justify-start gap-2 hover:bg-indigo-4 dark:hover:bg-indigodark-4"
            onClick={async () => {
              switch (textMatch) {
                case "available":
                  await selectEnteredLabel();
                  return;
                case "none":
                  await createEnteredLabel();
                  return;
              }
            }}
          >
            {textMatch === "available" && (
              <>
                <CheckIcon className="h-5 w-5" />
                Use Enter to add label &quot;{trimmedLabelName}&quot;
              </>
            )}

            {textMatch === "none" && (
              <>
                <PlusIcon className="h-5 w-5" />
                Use Enter to create new label &quot;{trimmedLabelName}&quot;
              </>
            )}
          </div>
        </button>
      ) : (
        <span className="flex gap-2 p-8" />
      )}
    </div>
  );
};

export const SetLabelsControl = (
  props: SetLabelsControlProps & ProfileIdType & { note: NoteDisplayType }
): JSX.Element => {
  const {
    clearInputState,
    deleteLastLabel,
    errorMessage,
    footer,
    highlightLastLabel,
    inputValue,
    labels,
    note,
    profile,
    selectedLabels,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  } = props;
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(0);

  useEffect(() => {
    setFocusedIndex(undefined);
  }, [inputValue]);

  const isSelected = useCallback(
    (label: Label): boolean => {
      return selectedLabels.some((other) => {
        return other.id === label.id;
      });
    },
    [selectedLabels]
  );

  useEffect(() => {
    if (focusedIndex === 0) {
      setHighlightLastLabel(false);
    }
  }, [setHighlightLastLabel, focusedIndex]);

  const toggleLabel = useCallback(
    async (label: Label) => {
      const supabase = createClient();
      if (isSelected(label)) {
        await supabase.from("note_labels").delete().eq("label_id", label.id);
      } else {
        await supabase.from("note_labels").insert({ label_id: label.id, note_id: note.id });
      }
      router.refresh();
      clearInputState();
    },
    [clearInputState, note, router, isSelected]
  );

  const filteredLabels = useMemo(() => {
    if (!labels) {
      return [];
    }
    return labels
      .filter((label) => {
        return label.name.toLowerCase().includes(inputValue.toLowerCase());
      })
      .sort((left: Label, right: Label) => {
        return left.name.localeCompare(right.name);
      });
  }, [inputValue, labels]);

  const createLabelFromFilterText = useCallback(
    async (text: string) => {
      const supabase = createClient();
      const trimmedLabelName = text.trim();
      const { data: label } = await supabase
        .from("labels")
        .insert({ color: randomLabelColorHex(), name: trimmedLabelName, user_id: profile.id })
        .select()
        .single();
      if (label) {
        toast.success(`Created label ${label.name}`, {});
        toggleLabel(label);
      } else {
        toast.error("Failed to create label");
      }
    },
    [toggleLabel, profile.id]
  );

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      const maxIndex = filteredLabels.length + 1;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        let newIndex = focusedIndex;
        if (focusedIndex) {
          newIndex = Math.max(0, focusedIndex - 1);
        } else {
          newIndex = undefined;
        }
        if (focusedIndex === maxIndex && !inputValue) {
          newIndex = maxIndex - 2;
        }
        setFocusedIndex(newIndex);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        let newIndex = focusedIndex;
        if (focusedIndex === undefined) {
          newIndex = 0;
        } else {
          newIndex = Math.min(maxIndex, focusedIndex + 1);
        }
        if (focusedIndex === maxIndex - 2 && !inputValue) {
          newIndex = maxIndex;
        }
        setFocusedIndex(newIndex);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (focusedIndex === maxIndex) {
          const _filterText = inputValue;
          setInputValue("");
          await createLabelFromFilterText(_filterText);
          return;
        }
        if (focusedIndex !== undefined) {
          const label = filteredLabels[focusedIndex];
          if (label) {
            toggleLabel(label);
          }
        }
      }
    },
    [
      inputValue,
      setInputValue,
      filteredLabels,
      focusedIndex,
      createLabelFromFilterText,
      toggleLabel,
    ]
  );

  const createEnteredLabel = useCallback(() => {
    const _filterText = inputValue;
    setInputValue("");
    return createLabelFromFilterText(_filterText);
  }, [inputValue, createLabelFromFilterText, setInputValue]);

  const selectEnteredLabel = useCallback(() => {
    const label = labels.find((l: Label) => {
      return l.name.toLowerCase() == inputValue.toLowerCase();
    });
    if (!label) {
      return Promise.resolve();
    }
    return toggleLabel(label);
  }, [inputValue, toggleLabel, labels]);

  return (
    <div onKeyDown={handleKeyDown} className="flex w-full flex-col items-start justify-start p-0">
      <Header
        labels={labels}
        focused={focusedIndex === undefined}
        resetFocusedIndex={() => {
          return setFocusedIndex(undefined);
        }}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedLabels={selectedLabels}
        tabCount={tabCount}
        setTabCount={setTabCount}
        tabStartValue={tabStartValue}
        setTabStartValue={setTabStartValue}
        highlightLastLabel={highlightLastLabel}
        setHighlightLastLabel={setHighlightLastLabel}
        deleteLastLabel={deleteLastLabel}
        selectOrCreateLabel={selectOrCreateLabel}
        clearInputState={clearInputState}
      />
      <div className="m-0 flex h-4 w-full items-center justify-end gap-1 pr-4 text-sm text-red-11 dark:text-reddark-11">
        {errorMessage && (
          <>
            {errorMessage}
            <ExclamationCircleIcon className="h-5 w-5" />
          </>
        )}
      </div>
      <div className="mt-2.5 flex h-[200px] w-full grow flex-col items-start justify-start overflow-y-scroll">
        {filteredLabels.map((label, idx) => {
          return (
            <LabelListItem
              key={label.id}
              label={label}
              focused={idx === focusedIndex}
              selected={isSelected(label)}
              toggleLabel={toggleLabel}
            />
          );
        })}
      </div>
      {footer ? (
        footer
      ) : (
        <Footer
          filterText={inputValue}
          selectedLabels={selectedLabels}
          availableLabels={labels}
          focused={focusedIndex === filteredLabels.length + 1}
          createEnteredLabel={createEnteredLabel}
          selectEnteredLabel={selectEnteredLabel}
        />
      )}
    </div>
  );
};
