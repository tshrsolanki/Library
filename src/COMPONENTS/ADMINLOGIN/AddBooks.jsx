import React, { useState } from "react";
import "./AddBooks.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LibraryBooks, RestartAlt } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AddBooks = () => {
  const [bookDetail, setbookDetail] = useState({
    bookname: "",
    author: "",
    availableqty: 0,
    genre: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const reset = () => {
    setbookDetail({
      bookname: "",
      author: "",
      availableqty: 0,
      genre: "",
    });
  };
  const detailHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setbookDetail({ ...bookDetail, [name]: value });
  };

  const add = async () => {
    if (
      !bookDetail.bookname ||
      !bookDetail.author ||
      !bookDetail.genre ||
      !bookDetail.availableqty
    ) {
      alert("Please enter all fields");
    } else {
      const resp = await fetch(`${url}/admin/addbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookDetail),
      });
      const res = await resp.json();
      reset();
      if (res.status) {
        setOpen(true);
      }
    }
  };

  return (
    <div className="addbooks-box">
      <div className="addbooks-subbox">
        <div className="addbooksbookname">
          <TextField
            id="outlined-basic"
            sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            label="BOOKNAME"
            variant="outlined"
            color="secondary"
            name="bookname"
            onChange={(e) => detailHandler(e)}
            value={bookDetail.bookname}
            autoComplete="off"
          />

          <TextField
            id="outlined-basic"
            sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            label="AUTHOR"
            variant="outlined"
            color="secondary"
            name="author"
            onChange={(e) => detailHandler(e)}
            value={bookDetail.author}
            autoComplete="off"
          />
          <TextField
            id="outlined-basic"
            sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            label="GENRE"
            variant="outlined"
            color="secondary"
            name="genre"
            onChange={(e) => detailHandler(e)}
            value={bookDetail.genre}
            autoComplete="off"
          />
          <TextField
            type="number"
            id="outlined-basic"
            sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            label="QUANTITY"
            variant="outlined"
            color="secondary"
            name="availableqty"
            onChange={(e) => detailHandler(e)}
            value={bookDetail.availableqty}
            autoComplete="off"
          />
          <div className="addbooksbutton1">
            <Fab
              variant="extended"
              color="warning"
              onClick={reset}
              className="addbooksb1"
            >
              <RestartAlt sx={{ mr: 1 }} />
              Reset
            </Fab>
            <Fab
              onClick={add}
              variant="extended"
              color="success"
              className="addbooksb2"
            >
              <LibraryBooks sx={{ mr: 1 }} />
              Add Book
            </Fab>
          </div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              color="success"
              sx={{
                width: "100%",
              }}
            >
              Book Added Successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};
