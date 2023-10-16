import { useReducer } from "react";

const initialState = {
  isShowConfirmDialog: false,
  isShowMenuDialog: false,
};

export type DialogActionType =
  | { type: "SHOW_MENU_DIALOG" }
  | { type: "HIDE_MENU_DIALOG" }
  | { type: "SHOW_CONFIRM_DIALOG" }
  | { type: "HIDE_CONFIRM_DIALOG" };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reducer = (_state = initialState, action: DialogActionType) => {
  switch (action.type) {
    case "SHOW_MENU_DIALOG":
      return { isShowConfirmDialog: false, isShowMenuDialog: true };
    case "HIDE_MENU_DIALOG":
      return { isShowConfirmDialog: false, isShowMenuDialog: false };
    case "SHOW_CONFIRM_DIALOG":
      return { isShowConfirmDialog: true, isShowMenuDialog: false };
    case "HIDE_CONFIRM_DIALOG":
      return { isShowConfirmDialog: false, isShowMenuDialog: false };
    default:
      throw new Error("Unknown action type");
  }
};

export const useNoteDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
};
