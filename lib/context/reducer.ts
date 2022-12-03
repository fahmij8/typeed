import type { StructInitialContext, TypeedAction } from '@/lib/types';
import { TypeedActionMap } from '@/lib/types';

const caseReducer = {
  [TypeedActionMap.SET_VALUE]: (state: StructInitialContext, action: any) => {
    return {
      ...state,
      ...action.payload,
    };
  },
};

const cases = {
  ...caseReducer,
};

const reducer = (state: StructInitialContext, action: TypeedAction) => {
  try {
    return cases[action.type](state, action.payload);
  } catch (error) {
    console.error('Reducer Error:', error);
    return state;
  }
};

export default reducer;
