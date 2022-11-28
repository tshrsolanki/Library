import { actions } from "../UTILS/constant";

const initailStUdentData = {
  firstname: "Loading",
  lastname: "Loading",
  studentid: "Loading",
  count: "loading",
};

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
