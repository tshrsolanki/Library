import React from "react";
import "./login.css";
import "../../GlobalCssSlider.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    button: {
      fontSize: "1.2rem",
    },
  },
});
export const Login = () => {
  return (
    <div className="grid">
      <ThemeProvider theme={theme}>
        <div className="flex ">
          <Link className="link" to={"/adminlogin"}>
            <Button
              className="css-1qtu9q6-MuiButtonBase-root-MuiButton-root"
              variant="contained"
              color="warning"
            >
              Admin Login
            </Button>
          </Link>
        </div>
        <div className="flex">
          <Link className="link" to={"/booklist"}>
            {/* <ThemeProvider theme={theme}> */}
            <Button
              className="bt css-ke5b6m-MuiButtonBase-root-MuiButton-root"
              variant="contained"
              color="success"
            >
              View Books
            </Button>
            {/* </ThemeProvider> */}
          </Link>
        </div>
        <div className="flex">
          <Link className="link" to={"/login"}>
            <Button
              className="bt css-kjirbw-MuiButtonBase-root-MuiButton-root"
              variant="contained"
              color="info"
            >
              Student Login
            </Button>
          </Link>
        </div>
      </ThemeProvider>
    </div>
  );
};
