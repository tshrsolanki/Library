import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import "./StudentBooks.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StudentBooks = (props) => {
  const [book, setbook] = useState([]);
  const [num, setnum] = useState(props.student.count);
  const [value, setvalue] = useState(false);
  const handleChange = (e, id) => {
    console.log(id);
    if (e.target.checked) {
      const n = num - 1;
      setnum(n);
      if (n === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].setAttribute("disabled", "");
        }
      }
    } else {
      if (num === 0) {
        const checkButton = document.querySelectorAll(".check");
        for (let i = 0; i < checkButton.length; i++) {
          if (!checkButton[i].checked)
            checkButton[i].removeAttribute("disabled");
        }
        const n = num + 1;
        setnum(n);
      }
      const n = num + 1;
      setnum(n);
    }
  };
  useEffect(async () => {
    const res = await fetch("http://localhost:4000/book/list");
    const response = await res.json();
    setbook(response);
    if (props.student.count === 0) {
      const checkButton = document.querySelectorAll(".check");
      for (let i = 0; i < checkButton.length; i++) {
        checkButton[i].setAttribute("disabled", "");
      }
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>BOOKNAME</StyledTableCell>
            <StyledTableCell>Author</StyledTableCell>
            <StyledTableCell>GENRE</StyledTableCell>
            <StyledTableCell>QTY</StyledTableCell>
            <StyledTableCell>
              {num}/{props.student.count}
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {book.map((book, i) => (
            <StyledTableRow key={book.bookid}>
              <StyledTableCell>{book.bookname}</StyledTableCell>
              <StyledTableCell>{book.author}</StyledTableCell>
              <StyledTableCell>{book.genre}</StyledTableCell>
              <StyledTableCell>{book.availableqty}</StyledTableCell>
              <StyledTableCell>
                <input
                  type="checkbox"
                  className="check"
                  onChange={(e) => handleChange(e, book.bookid)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
