import type { Dispatch, ReactNode } from "react";

export interface Notes {
  id: string;
  content: string;
  datetime: string;
}

export interface StructInitialContext {
  darkMode: boolean;
  bottomSheet: {
    visible: boolean;
    content: JSX.Element | ReactNode | null;
  };
  forceShowToolbar: boolean;
  savingStatus: string;
}

export enum TypeedActionMap {
  SET_VALUE = "SET_VALUE",
  OPEN_BOTTOM_SHEET = "OPEN_BOTTOM_SHEET",
  CLOSE_BOTTOM_SHEET = "CLOSE_BOTTOM_SHEET",
}

export interface TypeedAction {
  type: keyof typeof TypeedActionMap;
  payload?: any;
}

export type FnDispatch = Dispatch<TypeedAction>;
