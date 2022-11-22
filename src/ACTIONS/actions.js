import { actions } from "../UTILS/constant";

export const fetchStudentDetails = (rollno) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:4000/student/${rollno}`);

    const data = await res.json();
    dispatch({ type: actions.SET_STUDENT_DETAILS, payload: data });
  };
};
export const incIssueBooks = (id) => {
  return { type: actions.INC_ISSUEBOOKS, payload: id };
};
export const decIssueBooks = (id) => {
  return { type: actions.DEC_ISSUEBOOKS, payload: id };
};
export const fetchBooks = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:4000/book/list");
    const books = await res.json();
    dispatch({ type: actions.SET_BOOKLIST, payload: books });
  };
};

export const fetchStudentBookBorrowed = (rollno) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:4000/student/borrowed/${rollno}`);
    const data = await res.json();
    dispatch({ type: actions.SET_STUDENT_BOOKSBORROWED, payload: data });
  };
};
