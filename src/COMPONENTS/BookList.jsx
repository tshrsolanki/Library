import React, { useEffect } from "react";
import "../App.css";
import Scroll from "../Scroll";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../ACTIONS/actions";

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
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookList);
  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ padding: "15px", backgroundColor: "white" }}
    >
      <Table>
        <div className="width">
          <TableHead>
            <TableRow>
              <StyledTableCell>BOOKNAME</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>GENRE</StyledTableCell>
              <StyledTableCell>QTY</StyledTableCell>
            </TableRow>
          </TableHead>
        </div>
        <Scroll>
          <div className="scrollbook">
            <TableBody>
              {books.map((book, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{book.bookname}</StyledTableCell>
                  <StyledTableCell>{book.author}</StyledTableCell>
                  <StyledTableCell>{book.genre}</StyledTableCell>
                  <StyledTableCell>{book.availableqty}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </div>
        </Scroll>
      </Table>
    </TableContainer>
  );
};
