import { actions } from "../UTILS/constant";
const initialBookList = [];

export const bookList = (state = initialBookList, action) => {
  switch (action.type) {
    case actions.SET_BOOKLIST: {
      return action.payload;
    }

    default:
      return state;
  }
};
