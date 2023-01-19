import React, { useState, useEffect } from "react";
import { PendingReturns } from "./PendingReturns";
import Scroll from "../../Scroll";
import { EditBookList } from "./EditBookList";
import { AddBooks } from "./AddBooks";
import "./AdminComp.css";
import "../../GlobalCssSlider.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { fetchPendingReturns } from "../../ACTIONS/actions";
import { useNavigate } from "react-router-dom";
import { url } from "../../UTILS/constant";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const AdminComp = () => {
  const [value, setValue] = useState(0);
  const [books, setbooks] = useState([]);
  const [fet, setfet] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updatebooks = (temp, id) => {
    let newbooks = books;
    newbooks = newbooks.filter((book) => {
      return book.bookid !== id;
    });

    newbooks.push(temp);
    setbooks(newbooks);
  };

  const handleChange = (event, newValue) => {
    if (
      books.length &&
      window.confirm("Please save changes before switching tabs ")
    ) {
      return;
    }
    setbooks([]);
    setValue(newValue);
  };

  const update = () => {
    fetch(`${url}/admin/editbooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books }),
    }).then(() => {
      const b = document.querySelectorAll(".update");
      for (let i = 0; i < b.length; i++) {
        b[i].classList.remove("update");
      }
      setbooks([]);
      setfet(Math.floor(Math.random() * 100));
      setOpen(true);
    });
  };
  useEffect(() => {
    dispatch(fetchPendingReturns());

    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div className="color">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Pending returns" />
            <Tab label="Edit Book List" />
            <Tab label="Add Books" />

            <Button
              disabled={!books.length}
              variant="contained"
              color="success"
              sx={{ margin: 2 }}
              fullWidth
              onClick={update}
            >
              UPDATE BOOKS
            </Button>

            <div className="text1">
              <Button
                onClick={() => {
                  localStorage.removeItem("librarytoken");
                  navigate("/");
                }}
                variant="contained"
                color="warning"
                sx={{ margin: 2 }}
              >
                LOG OUT
              </Button>
            </div>
          </Tabs>
        </Box>
      </div>

      <div className="color2">
        <Scroll>
          {/* <TabPanel value={value} index={0}>
            <Details />
          </TabPanel> */}
          <TabPanel value={value} index={0}>
            <PendingReturns />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EditBookList updatebooks={updatebooks} setfet={setfet} fet={fet} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddBooks />
          </TabPanel>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              color="success"
              sx={{
                width: "100%",
              }}
            >
              Book Edited Successfully!
            </Alert>
          </Snackbar>
        </Scroll>
      </div>
    </Box>
  );
};
