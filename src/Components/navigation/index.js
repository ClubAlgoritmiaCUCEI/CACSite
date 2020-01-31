import React from "react";
import Login from "../../Components/login";
import "./style.css";

const Navigation = props => {
  const { className, selection } = props;
  return (
    <div className={`cac_navigation ${className}`}>
      {selection === "home" ? (
        <a class="active" href="#home">
          Home
        </a>
      ) : (
        <a href="#home">Home</a>
      )}
      {selection === "public" ? (
        <a class="active" href="#public">
          Public
        </a>
      ) : (
        <a href="#public">Public</a>
      )}
      {selection === "editorial" ? (
        <a class="active" href="#editorial">
          Editorial
        </a>
      ) : (
        <a href="#editorial">Editorial</a>
      )}
      {selection === "weeklyProblem" ? (
        <a class="active" href="#weeklyProblem">
          Weekly Problem
        </a>
      ) : (
        <a href="#weeklyProblem">Weekly Problem</a>
      )}
      <div class="login">
        <Login />
      </div>
    </div>
  );
};

export default Navigation;
