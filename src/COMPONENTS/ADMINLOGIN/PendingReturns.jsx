import React, { useEffect, useState } from "react";
import "./PendingReturns.css";

export const PendingReturns = (props) => {
  const [detail, setdetail] = useState([]);

  // const change = (e, id) => {};
  useEffect(() => {
    fetch(`http://localhost:4000/admin/pendingreturns`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setdetail(data);
      });
  }, []);

  return (
    <table>
      <tr>
        <th style={{ width: "25%" }}>STUDENT ROLL NO.</th>
        <th style={{ width: "25%" }}>BOOKID</th>
        <th style={{ width: "25%" }}>BORROW DATE</th>
        <th style={{ width: "25%" }}>RETURN DATE</th>
      </tr>
      {detail.length === 0 ? (
        <div className="borrowedadmin">
          <p>
            <strong> No Pending Returns </strong>
          </p>
        </div>
      ) : (
        detail.map((val, key) => (
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
