import React, { useState, useEffect } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import CreateClass from "../../Components/create-class";

import "./style.css";

const Create = props => {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState("");
  const [section, setSection] = useState("Select");

  const sections = [
    { value: "class", label: "Class", component: CreateClass },
    { value: "weeklyProblem", label: "Weekly problem" },
    { value: "editorial", label: "Editorial" },
    { value: "homePost", label: "Home Post" },
    { value: "Announcement", label: "Announcement" }
  ];

  const onChange = e => {
    console.log(e);
    setPath(`/create/${e.value}`);
    setRedirect(true);
  };

  useEffect(() => {
  }, [props]);

  const match = props.match || { params: { cid: "" } };
  return (
    <div className="cac_create">
      <Dropdown
        className="cac_create_dropdown cac_create_dropdown--sections"
        options={sections}
        onChange={onChange}
        value={match.params.cid}
        placeholder="Select"
      />
      {redirect && <Redirect to={path} />}
    </div>
  );
};

export default Create;
