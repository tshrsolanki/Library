import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export const BookList = () => {
  const [book, setbook] = useState([]);
  useEffect(async () => {
    const res = await fetch("http://localhost:4000/book/list");
    const response = await res.json();
    setbook(response);
  }, []);

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>BOOKNAME</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>GENRE</StyledTableCell>
              <StyledTableCell>QTY</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {book.map((book, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell>{book.bookname}</StyledTableCell>
                <StyledTableCell>{book.author}</StyledTableCell>
                <StyledTableCell>{book.genre}</StyledTableCell>
                <StyledTableCell>{book.availableqty}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
