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
  const [bookname, setbookname] = useState("");
  const [author, setauthor] = useState("");
  const [genre, setgenre] = useState("");
  const [qty, setqty] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const reset = () => {
    setbookname("");
    setauthor("");
    setgenre("");
    setqty(0);
  };

  const add = async () => {
    if (!bookname || !author || !genre || !qty) {
      alert("Please enter all fields");
    } else {
      const resp = await fetch("http://localhost:4000/admin/addbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookname: bookname,
          author: author,
          genre: genre,
          availableqty: qty,
        }),
      });
      const res = await resp.json();
      setbookname("");
      setauthor("");
      setgenre("");
      setqty(0);
      if (res.status) {
        setOpen(true);
      }
    }
  };

  return (
    <div className="addbooksaddbooks">
      <div className="addbooksbookname">
        <TextField
          id="outlined-basic"
          sx={{ width: "100%", marginTop: "1.5vh", marginBottom: "1.5vh" }}
          label="BOOKNAME"
          variant="outlined"
          color="secondary"
          onChange={(e) => setbookname(e.target.value)}
          value={bookname}
          autoComplete="off"
        />

        <TextField
          id="outlined-basic"
          sx={{ width: "100%", marginTop: "1.5vh", marginBottom: "1.5vh" }}
          label="AUTHOR"
          variant="outlined"
          color="secondary"
          onChange={(e) => setauthor(e.target.value)}
          value={author}
          autoComplete="off"
        />
        <TextField
          id="outlined-basic"
          sx={{ width: "100%", marginTop: "1.5vh", marginBottom: "1.5vh" }}
          label="GENRE"
          variant="outlined"
          color="secondary"
          onChange={(e) => setgenre(e.target.value)}
          value={genre}
          autoComplete="off"
        />
        <TextField
          type="number"
          id="outlined-basic"
          sx={{ width: "100%", marginTop: "1.5vh", marginBottom: "1.5vh" }}
          label="QUANTITY"
          variant="outlined"
          color="secondary"
          onChange={(e) => setqty(e.target.value)}
          value={qty}
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
  );
};
