import { combineReducers } from "redux";
import { bookList } from "./books.reducer";
import {
  issueBooks,
  studentBooksBorrowed,
  studentDetails,
} from "./student.reducer";

export const rootReducer = combineReducers({
  studentData: studentDetails,
  studentBooksBorrowed: studentBooksBorrowed,
  issueBooks: issueBooks,
  bookList: bookList,
});
