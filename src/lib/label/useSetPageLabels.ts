import { useCallback, useEffect, useReducer } from "react";

import throttle from "lodash/throttle";
import { toast } from "react-hot-toast";

import { type Label } from "@/lib/label/type";

export type LabelAction = "RESET" | "TEMP" | "SAVE";
export type LabelsDispatcher = (action: { labels: Label[]; type: LabelAction }) => void;

export const useSetPageLabels = (articleId?: string): [{ labels: Label[] }, LabelsDispatcher] => {
  const saveLabels = (labels: Label[], articleId: string) => {
    (async () => {
      const labelIds = labels.map((l) => {
        return l.id;
      });
      if (articleId) {
        // TODO：ラベル保存処理
        console.log(labelIds);
      }
    })();
  };

  const labelsReducer = (
    state: {
      articleId: string | undefined;
      labels: Label[];
      throttledSave: (labels: Label[], articleId: string) => void;
    },
    action: {
      articleId?: string;
      labels: Label[];
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
        if (state.articleId) {
          state.throttledSave(action.labels, state.articleId);
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
          articleId: action.articleId,
        };
      }
      default:
        return state;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    throttle((labels: Label[], articleId: string) => {
      return saveLabels(labels, articleId);
    }, 2000),
    []
  );

  useEffect(() => {
    dispatchLabels({
      articleId: articleId,
      labels: [],
      type: "UPDATE_ARTICLE_ID",
    });
  }, [articleId]);

  const [labels, dispatchLabels] = useReducer(labelsReducer, {
    articleId: articleId,
    labels: [],
    throttledSave: debouncedSave,
  });

  return [labels, dispatchLabels];
};
