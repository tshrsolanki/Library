import { combineReducers } from "redux";
import { bookList } from "./books.reducer";
import { issueBooks } from "./issueBooks.reducer";
import { pendingReturns } from "./pendingReturns.reducer";
import { returnBooks } from "./returnBooks.reducer";
import { studentBooksBorrowed, studentDetails } from "./student.reducer";

export const rootReducer = combineReducers({
  studentData: studentDetails,
  studentBooksBorrowed: studentBooksBorrowed,
  issueBooks: issueBooks,
  bookList: bookList,
  returnBooks: returnBooks,
  pendingReturns: pendingReturns,
});
