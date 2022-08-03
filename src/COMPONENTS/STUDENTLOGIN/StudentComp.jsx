import React, { useState, useEffect } from "react";
import { Details } from "./Details";
import Scroll from "../../Scroll";
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

const change = () => {};

export const StudentComp = () => {
  const [value, setValue] = useState(0);
  const [Val, setVal] = useState(true);
  const [student, setStudent] = useState({});
  const [params] = useSearchParams();
  const rollno = params.get("rollno");
  console.log(student);

  useEffect(() => {
    console.log("HH");
    fetch(`http://localhost:4000/student/${rollno}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data[0]);
        setStudent(data[0]);
      });
  }, []);
  const handleChange = (event, newValue) => {
    if (newValue === 2) {
      setVal(false);
    } else {
      setVal(true);
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="color">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Details" />
            <Tab label="Books Borrowed" />
            <Tab label="Book List" />
            <Button
              onClick={change}
              disabled={Val}
              variant="contained"
              color="success"
              sx={{ margin: 2 }}
            >
              Issue Books
            </Button>
            <div className="text">{`Available books to issue ${student.count}`}</div>
          </Tabs>
        </Box>
      </div>

      <div className="color2">
        <Scroll>
          <TabPanel value={value} index={0}>
            <Details student={student} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            <StudentBooks student={student} />
          </TabPanel>
        </Scroll>
      </div>
    </Box>
  );
};
