import React, { useState, useEffect } from "react";
import "./StudentBooks.css";
import Scroll1 from "../../Scroll1";
import { useDispatch, useSelector } from "react-redux";
import { decIssueBooks, incIssueBooks } from "../../ACTIONS/actions";

export const StudentBooks = (props) => {
  const [num, setnum] = useState(props.studentData.count);
  const bookList = useSelector((state) => state.bookList);
  const studentBooksBorrowed = useSelector(
    (state) => state.studentBooksBorrowed
  );

  const dispatch = useDispatch();
  const handleChange = (e, id) => {
    if (e.target.checked) {
      const n = num - 1;
      setnum(n);
      dispatch(incIssueBooks(id));

      if (n === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].setAttribute("disabled", "");
        }
      }
    } else {
      dispatch(decIssueBooks(id));

      if (num === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].removeAttribute("disabled");
        }
      }
      const n = num + 1;
      setnum(n);
    }
  };
  useEffect(() => {
    if (num === 0) {
      const checkButton = document.querySelectorAll(".check");
      for (let i = 0; i < checkButton.length; i++) {
        checkButton[i].setAttribute("disabled", "");
      }
    }
    const checkButton = document.querySelectorAll(".check");
    for (let i = 0; i < checkButton.length; i++) {
      checkButton[i].checked = false;
    }
    // eslint-disable-next-line
  }, [props.studentData.count]);

  return (
    <>
      <table>
        <tr>
          <th className="studentbooksbookid">ID</th>
          <th className="studentbooksbookname">BOOKNAME</th>
          <th className="studentbooksauthor">AUTHOR</th>
          <th className="studentbooksgenre">GENRE</th>
          <th className="studentbooksqty">QTY</th>
          <th>
            {num}/{5}
          </th>
        </tr>
      </table>
      <Scroll1>
        <table>
          {bookList.map((book, key) => {
            return (
              <tr key={key}>
                <td className="studentbooksbookid">{book.bookid}</td>
                <td className="studentbooksbookname">{book.bookname}</td>
                <td className="studentbooksauthor">{book.author}</td>
                <td className="studentbooksgenre">{book.genre}</td>
                <td className="studentbooksqty">{book.availableqty}</td>
                <td className="studentbookscell0">
                  {book.availableqty === 0 ? (
                    <div>
                      <input type="checkbox" disabled />
                    </div>
                  ) : studentBooksBorrowed.findIndex((detail) => {
                      return detail.bookid === book.bookid;
                    }) === -1 ? (
                    <div>
                      <input
                        type="checkbox"
                        className="check"
                        onChange={(e) => handleChange(e, book.bookid)}
                      />
                      {/* &emsp; &emsp;&ensp;&ensp; */}
                    </div>
                  ) : (
                    <div>Issued</div>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </Scroll1>
    </>
  );
};
