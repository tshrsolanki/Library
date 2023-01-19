import React, { useState, useEffect } from "react";
import "./EditBookList.css";
import "../../GlobalCssSlider.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { url } from "../../UTILS/constant";
const bookname = {
  height: "35px",
  fontSize: "17px",
  width: "70%",
};
const author = { height: "35px", fontSize: "17px", width: "60%" };
const genre = { height: "35px", fontSize: "17px", width: "50%" };
const qty = { height: "35px", fontSize: "17px", width: "40%" };
const tqty = { height: "15px", fontSize: "15px", width: "10%" };
const tgenre = {
  height: "15px",
  fontSize: "15px",
  width: "10%",
};
const tauthor = {
  height: "15px",
  fontSize: "15px",
  width: "20%",
};
const tid = { height: "15px", fontSize: "15px", width: "5%" };
const tbookname = {
  height: "15px",
  fontSize: "15px",
  width: "30%",
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const EditBookList = (props) => {
  const [book, setbook] = useState([]);

  const [copybook, setcopybook] = useState({
    bookname: "",
    author: "",
    genre: "",
    availableqty: -1,
  });
  const [editbookname, setbookname] = useState("");
  const [editauthor, setauthor] = useState("");
  const [editgenre, setgenre] = useState("");
  const [editqty, setqty] = useState(-1);
  const [boolset, setboolset] = useState(false);
  const [checkid, setcheckid] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const done = async (id) => {
    if (boolset && id === checkid) {
      let newbookn = editbookname,
        newauthor = editauthor,
        newgenre = editgenre,
        newqty = editqty;
      if (editbookname === "") {
        newbookn = copybook.bookname;
      }
      if (editauthor === "") {
        newauthor = copybook.author;
      }
      if (editgenre === "") {
        newgenre = copybook.genre;
      }
      if (editqty === -1) {
        newqty = copybook.availableqty;
      }
      const temp = {
        bookname: newbookn,
        author: newauthor,
        genre: newgenre,
        availableqty: newqty,
      };
      const b = document.getElementsByClassName(id);
      if (JSON.stringify(temp) !== JSON.stringify(copybook)) {
        Object.assign(temp, { bookid: id });
        props.updatebooks(temp, id);

        b[0].classList.add("update");
      }
      setbook(
        book.filter((b) => {
          if (b.bookid !== id) {
            return b;
          } else {
            Object.assign(b, {
              bookname: newbookn,
              author: newauthor,
              genre: newgenre,
              availableqty: newqty,
            });
            return b;
          }
        })
      );
      newbookn = "";
      newauthor = "";
      newgenre = "";
      newqty = -1;
      setbookname("");
      setauthor("");
      setgenre("");
      setqty(-1);
      setcopybook({
        bookname: "",
        author: "",
        genre: "",
        availableqty: -1,
      });

      b[1].setAttribute("hidden", "");
      b[2].setAttribute("hidden", "");
      b[3].setAttribute("hidden", "");
      b[4].setAttribute("hidden", "");
      setboolset(false);
    }
  };

  const Delete = (id) => {
    if (window.confirm("Are you sure to delete the book")) {
      fetch(`${url}/admin/deletebook/${id}`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          if (data.status) {
            setOpen(true);
            props.setfet(Math.floor(Math.random() * 100));
          }
        });
    }
  };

  const edit = (id, obj) => {
    setcheckid(id);
    const b = document.getElementsByClassName(id);
    setcopybook(obj);
    setbook(
      book.filter((b) => {
        if (b.bookid !== id) {
          return b;
        } else {
          const temp = b;
          Object.assign(temp, {
            bookname: "",
            author: "",
            genre: "",
            availableqty: "",
          });
          return temp;
        }
      })
    );
    b[1].removeAttribute("hidden");
    b[2].removeAttribute("hidden");
    b[3].removeAttribute("hidden");
    b[4].removeAttribute("hidden");
    setboolset(true);
  };

  useEffect(() => {
    fetch(`${url}/book/list`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setbook(data);
        setcopybook(data);
      });
  }, [props.fet]);

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>BOOKNAME</th>
        <th>AUTHOR</th>
        <th>GENRE</th>
        <th>QTY</th>
      </tr>

      {book.map((val, key) => {
        return (
          <tr key={key}>
            <td className={val.bookid} style={tid}>
              {val.bookid}
            </td>
            <td style={tbookname}>
              {val.bookname}
              <input
                defaultValue={val.bookname}
                className={val.bookid + " bookname"}
                style={bookname}
                hidden
                onChange={(e) => setbookname(e.target.value)}
              />
            </td>
            <td style={tauthor}>
              {val.author}
              <input
                defaultValue={val.author}
                className={val.bookid + " bookname"}
                style={author}
                hidden
                onChange={(e) => setauthor(e.target.value)}
              />
            </td>
            <td style={tgenre}>
              {val.genre}
              <input
                defaultValue={val.genre}
                className={val.bookid + " bookname"}
                style={genre}
                hidden
                onChange={(e) => setgenre(e.target.value)}
              />
            </td>
            <td style={tqty}>
              {val.availableqty}
              <input
                type="number"
                defaultValue={val.availableqty}
                className={val.bookid + " bookname"}
                style={qty}
                hidden
                min={0}
                onChange={(e) => setqty(e.target.value)}
              />
            </td>
            <td className="edit">
              <Fab
                disabled={boolset}
                onClick={() =>
                  edit(val.bookid, {
                    bookname: val.bookname,
                    author: val.author,
                    genre: val.genre,
                    availableqty: val.availableqty,
                  })
                }
                color="primary"
                size="small"
              >
                <EditIcon />
              </Fab>
            </td>
            <td className="edit">
              <Fab
                size="small"
                color="success"
                onClick={() => done(val.bookid)}
              >
                <CheckCircleOutlineIcon />
              </Fab>
            </td>
            <td className="edit">
              <Fab
                onClick={() => Delete(val.bookid)}
                size="small"
                color="warning"
              >
                <DeleteIcon />
              </Fab>
            </td>
          </tr>
        );
      })}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{
            width: "100%",
          }}
        >
          Book Deleted Successfully!
        </Alert>
      </Snackbar>
    </table>
  );
};
