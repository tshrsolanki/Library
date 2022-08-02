import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export const Login = () => {
  return (
    <div className="grid">
      <div className="flex">
        <Link className="link" to={"/booklist"}>
          <Button className="bt" variant="contained" color="warning">
            Admin Login
          </Button>
        </Link>
      </div>
      <div className="flex">
        <Link className="link" to={"/booklist"}>
          <Button className="bt" variant="contained" color="success">
            View Books
          </Button>
        </Link>
      </div>
      <div className="flex">
        <Link className="link" to={"/studentlogin"}>
          <Button className="bt" variant="contained" color="info">
            Student Login
          </Button>
        </Link>
      </div>
    </div>
  );
};
