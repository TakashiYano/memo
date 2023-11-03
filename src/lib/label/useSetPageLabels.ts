import { useCallback, useEffect, useReducer } from "react";

import throttle from "lodash/throttle";
import { toast } from "react-hot-toast";

import { type Label } from "@/lib/label/type";

export type LabelAction = "RESET" | "TEMP" | "SAVE";
export type LabelsDispatcher = (action: { labels: Label[]; type: LabelAction }) => void;

export const useSetPageLabels = (noteId?: string): [{ labels: Label[] }, LabelsDispatcher] => {
  const saveLabels = (labels: Label[], noteId: string) => {
    (async () => {
      const labelIds = labels.map((l) => {
        return l.id;
      });
      if (noteId) {
        // TODO：ラベル保存処理
        console.log(labelIds);
      }
    })();
  };

  const labelsReducer = (
    state: {
      labels: Label[];
      noteId: string | undefined;
      throttledSave: (labels: Label[], noteId: string) => void;
    },
    action: {
      labels: Label[];
      noteId?: string;
      type: string;
    }
  ) => {
    switch (action.type) {
      case "RESET": {
        return {
          ...state,
          labels: action.labels,
        };
      }
      case "TEMP": {
        return {
          ...state,
          labels: action.labels,
        };
      }
      case "SAVE": {
        if (state.noteId) {
          state.throttledSave(action.labels, state.noteId);
        } else {
          toast.error("Unable to update labels");
        }
        return {
          ...state,
          labels: action.labels,
        };
      }
      case "UPDATE_ARTICLE_ID": {
        return {
          ...state,
          noteId: action.noteId,
        };
      }
      default:
        return state;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    throttle((labels: Label[], noteId: string) => {
      return saveLabels(labels, noteId);
    }, 2000),
    []
  );

  useEffect(() => {
    dispatchLabels({
      labels: [],
      noteId: noteId,
      type: "UPDATE_ARTICLE_ID",
    });
  }, [noteId]);

  const [labels, dispatchLabels] = useReducer(labelsReducer, {
    labels: [],
    noteId: noteId,
    throttledSave: debouncedSave,
  });

  return [labels, dispatchLabels];
};
