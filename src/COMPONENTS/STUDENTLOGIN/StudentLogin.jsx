import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./StudentLogin.css";
import { url } from "../../UTILS/constant";
export const StudentLogin = () => {
  const [rollno, setRollno] = useState("");
  const [pass, setPass] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!rollno || !pass) {
      document.getElementById("studentloginbutt").setAttribute("disabled", "");
    } else {
      document.getElementById("studentloginbutt").removeAttribute("disabled");
    }
  }, [rollno, pass]);

  const login = async () => {
    const res = await fetch(`${url}/login/student/${rollno}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: pass,
      }),
    });

    const data = await res.json();
    if (data.status) {
      localStorage.setItem("librarytoken", data.token);
      navigate(`/studentlogin?rollno=${rollno}`);
    }
  };
  return (
    <>
      <div className="studentloginjoinOuterContainer">
        <Link to={"/"}>
          <Fab
            sx={{
              position: "absolute",
              marginTop: "-48vh",
              marginLeft: "-34vw",
              color: "red",
            }}
            size="small"
            variant="extended"
          >
            <ArrowBackIcon />
            BACK
          </Fab>
        </Link>
        <div className="studentloginjoinInnerContainer">
          <h1 className="studentloginheading">STUDENT LOGIN</h1>
          <div>
            <input
              placeholder="Rollno"
              className="studentloginjoinInput"
              type="text"
              onChange={(event) => setRollno(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              className="studentloginjoinInput mt-20"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <div className="message"></div>
          <Button
            id="studentloginbutt"
            variant="contained"
            className="studentloginbutton"
            type="submit"
            onClick={login}
            sx={{ marginTop: 2, height: "9vh", fontSize: "13pt" }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
