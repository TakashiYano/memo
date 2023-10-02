"use client";

import { useReducer } from "react";

const initialState = {
  isShowConfirmDialog: false,
};

type DialogActionType = { type: "SHOW_CONFIRM_DIALOG" } | { type: "HIDE_CONFIRM_DIALOG" };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reducer = (_state = initialState, action: DialogActionType) => {
  switch (action.type) {
    case "SHOW_CONFIRM_DIALOG":
      return { isShowConfirmDialog: true };
    case "HIDE_CONFIRM_DIALOG":
      return { isShowConfirmDialog: false };
    default:
      throw new Error("Unknown action type");
  }
};

export const useNoteDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
};
