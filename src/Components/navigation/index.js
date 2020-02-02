import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Login from "../../Components/login";
import "./style.css";

const Navigation = props => {
  const { className, selection } = props;
  return (
    <div className={`cac_navigation ${className || ""}`}>
      <Link
        to="/home"
        className={`cac_section ${selection === "home" ? "active" : ""}`}
      >
        Home
      </Link>
      <Link
        to="/public"
        className={`cac_section ${selection === "public" ? "active" : ""}`}
      >
        Public
      </Link>{" "}
      <Link
        to="/editorial"
        className={`cac_section ${selection === "editorial" ? "active" : ""}`}
      >
        Editorial
      </Link>{" "}
      <Link
        to="/weekly-problem"
        className={`cac_section ${
          selection === "weekly-problem" ? "active" : ""
        }`}
      >
        Weekly Problem
      </Link>
      <Link
        to="/calendar"
        className={`cac_section ${selection === "calendar" ? "active" : ""}`}
      >
        Calendar
      </Link>
      <div className="login">
        <Login />
      </div>
    </div>
  );
};

export default Navigation;
