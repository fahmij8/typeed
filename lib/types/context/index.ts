import type { Dispatch } from 'react';

export interface Notes {
  id: string;
  content: string;
  datetime: string;
}

export interface StructInitialContext {
  darkMode: boolean;
  savedNotes: Notes[];
}

export enum TypeedActionMap {
  SET_VALUE = 'SET_VALUE',
}

export interface TypeedAction {
  type: keyof typeof TypeedActionMap;
  payload: StructInitialContext;
}

export type FnDispatch = Dispatch<TypeedAction>;
