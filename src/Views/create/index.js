import React, { useState, useEffect } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import CreateClass from "../../Components/create-class";
import Button from '../../Components/button';

import "./style.css";

const Create = props => {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState("");
  const [preview, setPreview] = useState(false);

  const sections = [
    { value: "class", label: "Class" },
    { value: "weeklyProblem", label: "Weekly problem" },
    { value: "editorial", label: "Editorial" },
    { value: "homePost", label: "Home Post" },
    { value: "Announcement", label: "Announcement" }
  ];

  const onChange = e => {
    setPath(`/create/${e.value}`);
    setRedirect(true);
  };

  useEffect(() => { }, [props]);

  const handlePreviewClick = () => {
    setPreview(!preview);
  }

  const handlePostClick = () =>{
    
  }

  const match = props.match || { params: { cid: "" } };
  return (
    <div className="cac_create">
      <div className="cac_create_header">
        <Dropdown
          className="cac_create_dropdown cac_create_dropdown--sections"
          options={sections}
          onChange={onChange}
          value={match.params.cid}
          placeholder="Select"
        />
        <Button className="cac_create_preview" onClick={handlePreviewClick}>{preview ? "Edit" : "Preview"}</Button>
        <Button className="cac_create_post" onClick={handleClick}>{preview ? "Edit" : "Preview"}</Button>
        {redirect && <Redirect to={path} />}
      </div>
      {match.params.cid === "class" && <CreateClass preview={preview} />}
    </div>
  );
};

export default Create;
