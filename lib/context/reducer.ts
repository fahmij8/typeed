/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StructInitialContext, TypeedAction } from "@/lib/types";
import { TypeedActionMap } from "@/lib/types";

const caseReducer = {
  [TypeedActionMap.SET_VALUE]: (state: StructInitialContext, payload: any) => {
    return {
      ...state,
      ...payload,
    };
  },
  [TypeedActionMap.OPEN_BOTTOM_SHEET]: (
    state: StructInitialContext,
    payload: any
  ) => {
    return {
      ...state,
      bottomSheet: {
        visible: true,
        content: payload,
      },
    };
  },
  [TypeedActionMap.CLOSE_BOTTOM_SHEET]: (state: StructInitialContext) => {
    return {
      ...state,
      bottomSheet: {
        visible: false,
        content: null,
      },
    };
  },
};

const cases = {
  ...caseReducer,
};

const reducer = (state: StructInitialContext, action: TypeedAction) => {
  try {
    if (process.env.NODE_ENV === "development")
      console.log("Typeed reducer:", state, action);

    return cases[action.type as keyof typeof cases](state, action.payload);
  } catch (error) {
    console.error("Reducer Error:", error);
    return state;
  }
};

export default reducer;
