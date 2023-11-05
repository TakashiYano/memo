"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import AutosizeInput_, { type AutosizeInputProps } from "react-input-autosize";

import { EditLabelChip } from "@/app/(home)/_component/NoteContent/EditLabelChip";
import { EditLabelChipStack } from "@/app/(home)/_component/NoteContent/EditLabelChipStack";
import { type Label } from "@/lib/label/type";
import { type LabelsDispatcher } from "@/lib/label/useSetPageLabels";

const AutosizeInput = AutosizeInput_ as unknown as React.FunctionComponent<AutosizeInputProps>;

const MaxUnstackedLabels = 7;

type LabelsPickerProps = {
  clearInputState: () => void;
  deleteLastLabel: () => void;

  dispatchLabels: LabelsDispatcher;

  focused: boolean;
  highlightLastLabel: boolean;
  inputValue: string;

  labels: Label[];
  onFocus?: () => void;

  selectedLabels: Label[];
  selectOrCreateLabel: (value: string) => void;

  setHighlightLastLabel: (set: boolean) => void;
  setInputValue: (value: string) => void;
  setTabCount: (count: number) => void;
  setTabStartValue: (value: string) => void;

  tabCount: number;
  tabStartValue: string;
};

export const LabelsPicker = (props: LabelsPickerProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>();
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const {
    clearInputState,
    deleteLastLabel,
    dispatchLabels,
    focused,
    highlightLastLabel,
    inputValue,
    labels,
    onFocus,
    selectedLabels,
    selectOrCreateLabel,
    setHighlightLastLabel,
    setInputValue,
    setTabCount,
    setTabStartValue,
    tabCount,
    tabStartValue,
  } = props;

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, focused]);

  const autoComplete = useCallback(() => {
    const lowerCasedValue = inputValue.toLowerCase();

    if (lowerCasedValue.length < 1) {
      return;
    }

    let _tabCount = tabCount;
    let _tabStartValue = tabStartValue.toLowerCase();

    if (_tabCount === -1) {
      _tabCount = 0;
      _tabStartValue = lowerCasedValue;

      setTabCount(0);
      setTabStartValue(lowerCasedValue);
    } else {
      _tabCount = tabCount + 1;
      setTabCount(_tabCount);
    }

    const matches = labels.filter((l) => {
      return l.name.toLowerCase().startsWith(_tabStartValue);
    });

    if (_tabCount < matches.length) {
      setInputValue(matches[_tabCount].name);
    } else if (matches.length > 0) {
      setTabCount(0);
      setInputValue(matches[0].name);
    }
  }, [inputValue, tabCount, tabStartValue, setInputValue, setTabCount, setTabStartValue, labels]);

  const clearTabState = useCallback(() => {
    setTabCount(-1);
    setTabStartValue("");
  }, [setTabCount, setTabStartValue]);

  const isEmpty = useMemo(() => {
    return selectedLabels.length === 0 && inputValue.length === 0;
  }, [inputValue, selectedLabels]);

  const isStacked = useMemo(() => {
    return selectedLabels.length > MaxUnstackedLabels && !isStackExpanded;
  }, [selectedLabels.length, isStackExpanded]);

  return (
    <div
      onMouseDown={(event) => {
        inputRef.current?.focus();
        setHighlightLastLabel(false);
        inputRef.current?.setSelectionRange(
          inputRef.current?.value.length,
          inputRef.current?.value.length
        );
        event.preventDefault();
      }}
      onDoubleClick={(event) => {
        inputRef.current?.focus();
        setHighlightLastLabel(false);
        inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
        event.preventDefault();
      }}
      className="inline-block w-full cursor-text rounded-xl border-indigo-6 bg-indigo-3 p-1 text-left leading-loose dark:border-indigodark-6 dark:bg-indigodark-3 [&>span]:my-0"
    >
      {isStacked ? (
        <EditLabelChipStack
          labels={selectedLabels}
          setExpanded={() => {
            setIsStackExpanded(true);
          }}
          isSelected={highlightLastLabel}
        />
      ) : (
        selectedLabels.map((label, idx) => {
          return (
            <EditLabelChip
              key={label.id}
              text={label.name}
              color={label.color}
              isSelected={highlightLastLabel && idx == selectedLabels.length - 1}
              xAction={() => {
                const idx = selectedLabels.findIndex((l) => {
                  return l.id == label.id;
                });
                if (idx !== -1) {
                  const _selectedLabels = selectedLabels;
                  _selectedLabels.splice(idx, 1);
                  dispatchLabels({
                    labels: [..._selectedLabels],
                    type: "SAVE",
                  });
                }
              }}
            />
          );
        })
      )}
      <span className="inline-flex h-6 -translate-y-1 pb-5">
        <AutosizeInput
          placeholder={isEmpty ? "Add Labels" : undefined}
          inputRef={(ref) => {
            inputRef.current = ref;
          }}
          inputStyle={{
            all: "unset",
            borderStyle: "none",
            fontSize: "16px",
            marginLeft: "2px",
            minWidth: inputValue.length == 0 && selectedLabels.length == 0 ? "100px" : "2px",
            outline: "none",
          }}
          onFocus={() => {
            if (onFocus) {
              onFocus();
            }
          }}
          minWidth="2px"
          maxLength={48}
          value={inputValue}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyUp={(event) => {
            switch (event.key) {
              case "Escape":
                clearInputState();
                break;
              case "Enter":
                if (isStacked && highlightLastLabel) {
                  setIsStackExpanded(true);
                  setHighlightLastLabel(false);
                } else {
                  selectOrCreateLabel(inputValue);
                }
                event.preventDefault();
                break;
            }
          }}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Tab":
                autoComplete();
                event.preventDefault();
                break;
              case "Delete":
              case "Backspace":
                clearTabState();
                if (inputValue.length === 0) {
                  if (isStacked && highlightLastLabel) {
                    setIsStackExpanded(true);
                    setHighlightLastLabel(false);
                  } else {
                    deleteLastLabel();
                  }
                  event.preventDefault();
                }
                break;
            }
          }}
          onChange={function (event) {
            setInputValue(event.target.value);
          }}
        />
      </span>
    </div>
  );
};
