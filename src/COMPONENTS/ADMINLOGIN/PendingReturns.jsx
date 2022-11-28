import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PendingReturns.css";

export const PendingReturns = () => {
  const pendingBooks = useSelector((state) => state.pendingReturns);

  return (
    <table>
      <tr>
        <th style={{ width: "25%" }}>STUDENT ROLL NO.</th>
        <th style={{ width: "25%" }}>BOOKID</th>
        <th style={{ width: "25%" }}>BORROW DATE</th>
        <th style={{ width: "25%" }}>RETURN DATE</th>
      </tr>
      {pendingBooks.length === 0 ? (
        <div className="borrowedadmin">
          <p>
            <strong> No Pending Returns </strong>
          </p>
        </div>
      ) : (
        pendingBooks.map((val, key) => (
          <tr key={key}>
            <td>{val.student_id}</td>
            <td>{val.book_id}</td>
            <td>{val.borrow_date.slice(0, 10)}</td>
            <td>{val.return_date.slice(0, 10)}</td>
          </tr>
        ))
      )}
    </table>
  );
};
