import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decReturnBooks, incReturnBooks } from "../../ACTIONS/actions";
import "./Booksborrowed.css";

const bookname = {
  width: "40%",
};
export const Booksborrowed = () => {
  const studentBooksBorrowed = useSelector(
    (state) => state.studentBooksBorrowed
  );
  const dispatch = useDispatch();
  const setReturnBooks = (e, id) => {
    if (e.target.checked) {
      dispatch(incReturnBooks(id));
    } else {
      dispatch(decReturnBooks(id));
    }
  };
  useEffect(() => {
    if (studentBooksBorrowed.length) {
      const checkbooks = document.getElementsByClassName("booksBorrowed-check");
      for (let i = 0; i < checkbooks.length; i++) {
        checkbooks[i].checked = false;
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <table>
      <tr>
        <th style={bookname}>BOOKNAME</th>
        <th>AUTHOR</th>
        <th>BORROW DATE</th>
        <th>RETURN DATE</th>
      </tr>
      {studentBooksBorrowed.length === 0 ? (
        <div className="borrowed">
          <p>
            <strong> No Books issued </strong>
          </p>
        </div>
      ) : (
        studentBooksBorrowed.map((val, key) => (
          <tr key={key}>
            <td style={bookname}>{val.bookname}</td>
            <td>{val.author}</td>
            <td>{val.borrow_date}</td>
            <td>{val.return_date}</td>
            <td>
              <input
                type="checkbox"
                className="booksBorrowed-check"
                onClick={(e) => {
                  setReturnBooks(e, val.bookid);
                }}
              />
            </td>
          </tr>
        ))
      )}
    </table>
  );
};
