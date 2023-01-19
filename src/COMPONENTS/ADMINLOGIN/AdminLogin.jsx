import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AdminLogin.css";
import { url } from "../../UTILS/constant";
export const AdminLogin = () => {
  const [adminId, setadminId] = useState("");
  const [pass, setPass] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!adminId || !pass) {
      document.getElementById("adminloginbutt").setAttribute("disabled", "");
    } else {
      document.getElementById("adminloginbutt").removeAttribute("disabled");
    }
  }, [adminId, pass]);

  const login = async () => {
    const res = await fetch(`${url}/login/admin/${adminId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: pass,
      }),
    });

    const data = await res.json();
    if (data.status) {
      localStorage.setItem("librarytoken", data.token);
      navigate(`/adminpage`);
    }
  };
  return (
    <>
      <div className="adminloginjoinOuterContainer">
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
        <div className="adminloginjoinInnerContainer">
          <h1 className="adminloginheading">ADMIN LOGIN</h1>
          <div>
            <input
              placeholder="Admin Id"
              className="adminloginjoinInput"
              type="text"
              onChange={(event) => setadminId(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              className="adminloginjoinInput mt-20"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <div className="message"></div>
          <Button
            id="adminloginbutt"
            variant="contained"
            className="adminloginbutton"
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
