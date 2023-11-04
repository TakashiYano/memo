"use client";

import { useMemo } from "react";

import { type Label } from "@/lib/label/type";

type EditLabelChipStackProps = {
  isSelected?: boolean;
  labels: Label[];
  setExpanded: (expanded: boolean) => void;
};

export function EditLabelChipStack(props: EditLabelChipStackProps): JSX.Element {
  const { isSelected, labels, setExpanded } = props;
  const colors = useMemo(() => {
    const mapped = labels.map((l) => {
      return l.color;
    });
    if (mapped.length > 7) {
      const set = new Set(mapped);
      return Array.from(set).slice(0, 7);
    }
    return mapped;
  }, [labels]);

  return (
    <span
      className={`m-0.5 inline-table cursor-pointer whitespace-nowrap rounded-xl border-indigo-6 bg-indigo-9 bg-clip-padding px-[7px] py-[1px] dark:border-indigodark-6 dark:bg-indigodark-9 ${
        isSelected && "ring-2"
      }`}
      onClick={(event) => {
        setExpanded(true);
        event.preventDefault();
      }}
    >
      <div className="flex flex-row items-center justify-center gap-2 pl-4">
        {colors.map((color, idx) => {
          return (
            <span key={`label-color${idx}`} className="ml-[-15px] flex h-full">
              <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${color}` }} />
            </span>
          );
        })}
        <span>{`${labels.length} labels`}</span>
      </div>
    </span>
  );
}
