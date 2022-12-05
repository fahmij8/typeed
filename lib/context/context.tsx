import { createElement, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { initialContext } from "./initial";

import type { ReactNode } from "react";
import type { FnDispatch, StructInitialContext } from "@/lib/types";

export interface StructTypeedContext extends StructInitialContext {
  dispatch: FnDispatch;
}

const getInitialContext = () => initialContext;
const TypeedContext = createContext<StructTypeedContext>({
  ...getInitialContext(),
  dispatch: () => {},
});
const useTypeedContext = () => useContext(TypeedContext);

interface TypeedProviderProps {
  children: ReactNode;
}

const TypeedProvider = ({ children }: TypeedProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialContext());

  const value = {
    ...state,
    dispatch,
  };

  if (process.env.NODE_ENV === "development")
    console.log("Typeed context:", value);

  return createElement(TypeedContext.Provider, { value }, children);
};

export { TypeedProvider, useTypeedContext };
