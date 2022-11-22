import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./StudentBooks.css";
import Scroll1 from "../../Scroll1";
import { useDispatch, useSelector } from "react-redux";
import {
  decIssueBooks,
  fetchBooks,
  fetchStudentBookBorrowed,
  incIssueBooks,
} from "../../ACTIONS/actions";

export const StudentBooks = (props) => {
  // const [bookborrowed, setbookborrowed] = useState([]);
  const [num, setnum] = useState(props.student.count);
  const [params] = useSearchParams();
  const rollno = params.get("rollno");

  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookList);
  const booksborrowed = useSelector((state) => state.studentBooksBorrowed);
  console.log(
    `file: StudentBooks.jsx ~ line 22 ~ booksborrowed`,
    booksborrowed
  );
  console.log(`file: StudentBooks.jsx ~ line 17 ~ books`, books);
  const handleChange = (e, id) => {
    if (e.target.checked) {
      const n = num - 1;
      setnum(n);
      // props.setissuebooks([...props.issuebooks, id]);
      dispatch(incIssueBooks(id));

      if (n === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].setAttribute("disabled", "");
        }
      }
    } else {
      // props.setissuebooks(
      //   props.issuebooks.filter((i) => {
      //     return i !== id;
      //   })

      // );
      dispatch(decIssueBooks(id));

      if (num === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].removeAttribute("disabled");
        }
        // const n = num + 1;
        // setnum(n);
      }
      const n = num + 1;
      setnum(n);
    }
  };
  useEffect(() => {
    if (!books.length) dispatch(fetchBooks());

    if (props.student.count === 0) {
      const checkButton = document.querySelectorAll(".check");
      for (let i = 0; i < checkButton.length; i++) {
        checkButton[i].setAttribute("disabled", "");
      }
    }
    const checkButton = document.querySelectorAll(".check");
    for (let i = 0; i < checkButton.length; i++) {
      checkButton[i].checked = false;
    }

    dispatch(fetchStudentBookBorrowed(rollno));
    // fetch(`http://localhost:4000/student/borrowedbookid/${rollno}`)
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     setbookborrowed(data);
    //   });
  }, [props.student.count]);

  return (
    <>
      <table>
        <tr>
          <th className="studentbooksbookid">ID</th>
          <th className="studentbooksbookname">BOOKNAME</th>
          <th className="studentbooksauthor">AUTHOR</th>
          <th className="studentbooksgenre">GENRE</th>
          <th className="studentbooksqty">QTY</th>
          <th className="cstudentbooksell">
            {num}/{props.student.count}
          </th>
        </tr>
      </table>
      <Scroll1>
        <table>
          {books.map((book, key) => {
            return (
              <tr key={key}>
                <td>{book.bookid}</td>
                <td>{book.bookname}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.availableqty}</td>
                <td className="studentbookscell0">
                  {book.availableqty === 0 ? (
                    <div>
                      <input type="checkbox" disabled />
                    </div>
                  ) : booksborrowed.indexOf(Number(book.bookid)) === -1 ? (
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
