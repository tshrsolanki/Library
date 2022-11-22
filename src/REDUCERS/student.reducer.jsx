import { actions } from "../UTILS/constant";

const initailStUdentData = {
  firstname: "Loading",
  lastname: "Loading",
  studentid: "Loading",
  count: "loading",
};
const initialIssueBooks = [];

const initailStudentBooksBorrowed = [];

export const studentDetails = (state = initailStUdentData, action) => {
  switch (action.type) {
    case actions.SET_STUDENT_DETAILS:
      return action.payload;

    default:
      return state;
  }
};

export const studentBooksBorrowed = (
  state = initailStudentBooksBorrowed,
  action
) => {
  switch (action.type) {
    case actions.SET_STUDENT_BOOKSBORROWED:
      return action.payload;

    default:
      return state;
  }
};

export const issueBooks = (state = initialIssueBooks, action) => {
  switch (action.type) {
    case actions.SET_ISSUEBOOKS: {
      return action.payload;
    }
    case actions.INC_ISSUEBOOKS: {
      return [...state, action.payload];
    }
    case actions.DEC_ISSUEBOOKS: {
      const newBooks = state.filter((id) => {
        return id !== action.payload;
      });
      return newBooks;
    }

    default:
      return state;
  }
};
