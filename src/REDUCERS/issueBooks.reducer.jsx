import { actions } from "../UTILS/constant";

const initialIssueBooks = [];
export const issueBooks = (state = initialIssueBooks, action) => {
  switch (action.type) {
    case actions.INC_ISSUEBOOKS: {
      return [...state, action.payload];
    }
    case actions.DEC_ISSUEBOOKS: {
      const newBooks = state.filter((id) => {
        return id !== action.payload;
      });
      return newBooks;
    }
    case actions.EMPTY_ISSUEBOOKS: {
      return action.payload;
    }

    default:
      return state;
  }
};
