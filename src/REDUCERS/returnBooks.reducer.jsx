import { actions } from "../UTILS/constant";

const initialReturnBooks = [];

export const returnBooks = (state = initialReturnBooks, action) => {
  switch (action.type) {
    case actions.INC_RETURNBOOKS: {
      return [...state, action.payload];
    }
    case actions.DEC_RETURNBOOKS: {
      const newArr = state.filter((tempId) => {
        return tempId !== action.payload;
      });
      return newArr;
    }
    case actions.EMPTY_RETURNBOOKS: {
      return action.payload;
    }
    default:
      return state;
  }
};
