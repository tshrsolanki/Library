import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentDetails,
  fetchStudentBookBorrowed,
  fetchBooks,
  emptyReturnBooks,
  emptyIssueBooks,
  setStudentDetails,
} from "../../ACTIONS/actions";

import { Booksborrowed } from "./Booksborrowed";
import { Details } from "./Details";
import { StudentBooks } from "./StudentBooks";
import "./StudentComp.css";
import "../../GlobalCssSlider.css";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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

export const StudentComp = () => {
  const [value, setValue] = useState(0);
  const [Val2, setVal2] = useState(true);
  const [Val1, setVal1] = useState(true);
  const [params] = useSearchParams();
  const rollno = params.get("rollno");
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentData);

  const returnBooks = useSelector((state) => state.returnBooks);
  const issueBooks = useSelector((state) => state.issueBooks);
  console.log("studentcomp");
  useEffect(() => {
    console.log("effect");
    dispatch(fetchStudentDetails(rollno));
  }, []);
  useEffect(() => {
    console.log("effect2");
    dispatch(fetchBooks());
    dispatch(fetchStudentBookBorrowed(rollno));
  }, [studentData.count]);

  const returnBookHandler = async () => {
    if (returnBooks.length) {
      console.log("fetch");
      const res = await fetch(
        `http://localhost:4000/student/returnbooks/${rollno}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            returnbooks: returnBooks,
            count: studentData.count + returnBooks.length,
          }),
        }
      );
      const [resp] = await res.json();
      dispatch(setStudentDetails(resp));
      dispatch(emptyReturnBooks());
    }
  };
  const issueBookHandler = async () => {
    if (issueBooks.length) {
      const res = await fetch(
        `http://localhost:4000/student/issuebooks/${rollno}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            issuebooks: issueBooks,
            count: studentData.count - issueBooks.length,
          }),
        }
      );
      const [resp] = await res.json();
      dispatch(emptyIssueBooks());
      dispatch(setStudentDetails(resp));
    }
  };

  const handleChange = (event, newValue) => {
    if (newValue === 2) {
      setVal2(false);
    } else {
      setVal2(true);
    }
    if (newValue === 1) {
      setVal1(false);
    } else {
      setVal1(true);
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="studentcompcolor">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Details" />

            <Tab label="Books Borrowed" />

            <Tab label="Book List" />
            <Button
              onClick={returnBookHandler}
              disabled={Val1}
              variant="contained"
              color="secondary"
              sx={{ margin: 2 }}
            >
              Return Books
            </Button>
            <Button
              onClick={issueBookHandler}
              disabled={Val2}
              variant="contained"
              color="success"
              sx={{ margin: 2 }}
            >
              Issue Books
            </Button>

            <div className="studentcomptext">{`Available books to issue : ${studentData.count}`}</div>
          </Tabs>
        </Box>
      </div>

      <div className="studentcompcolor2">
        {/* <Scroll> */}
        <TabPanel value={value} index={0}>
          <Details studentData={studentData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Booksborrowed />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StudentBooks studentData={studentData} />
        </TabPanel>
        {/* </Scroll> */}
      </div>
    </Box>
  );
};
