"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CheckIcon, ExclamationCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

import { LabelsPicker } from "@/app/(home)/_component/NoteContent/LabelsPicker";
import { type Label } from "@/lib/label/type";
import { type LabelsDispatcher } from "@/lib/label/useSetPageLabels";

// TODO：ラベル取得結果
const labels = [{ color: "#111111", id: "1", name: "test" }];

export interface LabelsProvider {
  labels?: Label[];
}

type SetLabelsControlProps = {
  clearInputState: () => void;
  deleteLastLabel: () => void;
  dispatchLabels: LabelsDispatcher;

  errorMessage?: string;
  footer?: React.ReactNode;

  highlightLastLabel: boolean;
  inputValue: string;
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
    dispatchLabels,
    focused,
    highlightLastLabel,
    inputValue,
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
    <div>
      <div>
        <LabelsPicker
          focused={focused}
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedLabels={selectedLabels}
          dispatchLabels={dispatchLabels}
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
    >
      <input autoFocus={focused} hidden={true} type="checkbox" checked={selected} readOnly />
      <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${label.color}` }} />
      <span className="text-xs text-indigo-12 dark:text-indigodark-12">{label.name}</span>
      {selected && <CheckIcon className="h-5 w-5" />}
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
    <div ref={ref}>
      {trimmedLabelName.length > 0 ? (
        <button
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
        </button>
      ) : null}
    </div>
  );
};

export const SetLabelsControl = (props: SetLabelsControlProps): JSX.Element => {
  const {
    clearInputState,
    deleteLastLabel,
    dispatchLabels,
    errorMessage,
    footer,
    highlightLastLabel,
    inputValue,
    selectedLabels,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  } = props;
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
      let newSelectedLabels = [...selectedLabels];
      if (isSelected(label)) {
        newSelectedLabels = selectedLabels.filter((other) => {
          return other.id !== label.id;
        });
      } else {
        newSelectedLabels = [...selectedLabels, label];
      }
      dispatchLabels({ labels: newSelectedLabels, type: "SAVE" });

      clearInputState();
    },
    [clearInputState, dispatchLabels, selectedLabels, isSelected]
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
  }, [inputValue]);

  const createLabelFromFilterText = useCallback(
    async (text: string) => {
      const trimmedLabelName = text.trim();
      // ラベル作成処理
      console.log(trimmedLabelName);
      const label = { color: "#111111", id: "1", name: "test" };
      if (label) {
        toast.success(`Created label ${label.name}`, {});
        toggleLabel(label);
      } else {
        toast.error("Failed to create label");
      }
    },
    [toggleLabel]
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
  }, [inputValue, toggleLabel]);

  return (
    <div onKeyDown={handleKeyDown}>
      <Header
        focused={focusedIndex === undefined}
        resetFocusedIndex={() => {
          return setFocusedIndex(undefined);
        }}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedLabels={selectedLabels}
        dispatchLabels={dispatchLabels}
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
      <div>
        {errorMessage && (
          <>
            {errorMessage}
            <ExclamationCircleIcon className="h-5 w-5" />
          </>
        )}
      </div>
      <div>
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
