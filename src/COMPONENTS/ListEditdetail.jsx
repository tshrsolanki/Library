import React from "react";
import { Link } from "react-router-dom";
import "./ListEditdetail.css";

export const ListEditdetail = () => {
  return (
    <div className="row">
      <div className="col col-md-6 bgs contain App">
        <div>
          <Link to={"/studentdetail"}>
            <button className="btn btn-info">Student List</button>
          </Link>
        </div>
        <div>
          <Link to={"/bookdetail"}>
            <button className="btn btn-info">Book List</button>
          </Link>
        </div>
      </div>
      <div className="col col-md-6 contain bge App">
        <div>
          <Link to={"/studentedit"}>
            <button className="btn btn-primary">Student Edit</button>
          </Link>
        </div>
        <div>
          <Link to={"/bookedit"}>
            <button className="btn btn-primary ">Book Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
