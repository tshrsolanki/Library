import { actions, url } from "../UTILS/constant";

export const fetchStudentDetails = (rollno) => {
  return async (dispatch) => {
    console.log(url);
    const res = await fetch(`${url}/student/${rollno}`);

    const data = await res.json();
    dispatch({ type: actions.SET_STUDENT_DETAILS, payload: data });
  };
};
export const setStudentDetails = (studentDetails) => {
  return {
    type: actions.SET_STUDENT_DETAILS,
    payload: studentDetails,
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
    const res = await fetch(`${url}/book/list`);
    const books = await res.json();
    dispatch({ type: actions.SET_BOOKLIST, payload: books });
  };
};

export const fetchStudentBookBorrowed = (rollno) => {
  return async (dispatch) => {
    const res = await fetch(`${url}/student/borrowed/${rollno}`);
    const data = await res.json();
    dispatch({ type: actions.SET_STUDENT_BOOKSBORROWED, payload: data });
  };
};
export const incReturnBooks = (id) => {
  return { type: actions.INC_RETURNBOOKS, payload: id };
};
export const decReturnBooks = (id) => {
  return { type: actions.DEC_RETURNBOOKS, payload: id };
};
export const emptyReturnBooks = () => {
  return { type: actions.EMPTY_RETURNBOOKS, payload: [] };
};
export const emptyIssueBooks = () => {
  return { type: actions.EMPTY_ISSUEBOOKS, payload: [] };
};

export const fetchPendingReturns = () => {
  return async (dispatch) => {
    const res = await fetch(`${url}/admin/pendingreturns`);
    const data = await res.json();
    dispatch({
      type: actions.SET_PENDINGRETURNS,
      payload: data,
    });
  };
};
