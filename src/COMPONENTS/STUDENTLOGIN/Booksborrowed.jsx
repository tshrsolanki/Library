import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchStudentBookBorrowed } from "../../ACTIONS/actions";
import "./Booksborrowed.css";

const bookname = {
  width: "40%",
};
export const Booksborrowed = (props) => {
  const [search] = useSearchParams();
  const rollno = search.get("rollno");
  const dispatch = useDispatch();
  const booksBorrowed = useSelector((state) => state.studentBooksBorrowed);
  if (booksBorrowed.length) {
    const checkbooks = document.getElementsByClassName("check");
    for (let i = 0; i < checkbooks.length; i++) {
      checkbooks[i].checked = false;
    }
  }
  const change = (e, id) => {
    if (e.target.checked) {
      props.setreturnbooks([...props.returnbooks, id]);
    } else {
      props.setreturnbooks(
        props.returnbooks.filter((bookid) => {
          return bookid !== id;
        })
      );
    }
  };
  useEffect(() => {
    if (!booksBorrowed.length) {
      console.log("effect");
      dispatch(fetchStudentBookBorrowed(rollno));
    }
  }, [props.student.count]);

  return (
    <table>
      <tr>
        <th style={bookname}>BOOKNAME</th>
        <th>AUTHOR</th>
        <th>BORROW DATE</th>
        <th>RETURN DATE</th>
      </tr>
      {booksBorrowed.length === 0 ? (
        <div className="borrowed">
          <p>
            <strong> No Books issued </strong>
          </p>
        </div>
      ) : (
        booksBorrowed.map((val, key) => (
          <tr key={key}>
            <td style={bookname}>{val.bookname}</td>
            <td>{val.author}</td>
            <td>{val.borrow_date}</td>
            <td>{val.return_date}</td>
            <td>
              <input
                type="checkbox"
                className="check"
                onClick={(e) => {
                  change(e, val.bookid);
                }}
              />
            </td>
          </tr>
        ))
      )}
    </table>
  );
};
