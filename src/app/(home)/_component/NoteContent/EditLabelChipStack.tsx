"use client";

import { useMemo } from "react";

import { type Label } from "@/lib/label/type";

type EditLabelChipStackProps = {
  labels: Label[];
  setExpanded: (expanded: boolean) => void;
};

export function EditLabelChipStack(props: EditLabelChipStackProps): JSX.Element {
  const { labels, setExpanded } = props;
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
    <button
      onClick={(event) => {
        setExpanded(true);
        event.preventDefault();
      }}
    >
      <ul>
        {colors.map((color, idx) => {
          return (
            <li key={`label-color${idx}`}>
              <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${color}` }} />
            </li>
          );
        })}
        <div>{`${labels.length} labels`}</div>
      </ul>
    </button>
  );
}
