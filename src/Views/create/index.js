import React, { useState, useEffect } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import CreateClass from "../../Components/create-class";
import CreatePost from "../../Components/create-post";
import Button from "../../Components/button";

import "./style.css";

const Create = props => {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState("");
  const [preview, setPreview] = useState(false);

  const sections = [
    { value: "class", label: "Class" },
    { value: "homePost", label: "Home Post" },
    { value: "weeklyProblem", label: "Weekly problem" },
    { value: "editorial", label: "Editorial" },
    { value: "announcement", label: "Announcement" }
  ];

  const onChange = e => {
    setPath(`/create/${e.value}`);
    setRedirect(true);
    setPreview(false);
  };

  useEffect(() => {}, [props]);

  const handlePreviewClick = () => {
    setPreview(!preview);
  };

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
        <Button className="cac_create_preview" onClick={handlePreviewClick}>
          {preview ? "Edit" : "Preview"}
        </Button>

        {redirect && <Redirect to={path} />}
      </div>
      {match.params.cid === "class" && <CreateClass preview={preview} />}
      {match.params.cid === "homePost" && (
        <CreatePost preview={preview} to="posts" type="home" />
      )}
      {match.params.cid === "weeklyProblem" && (
        <CreatePost
          preview={preview}
          to="weekly-problems"
          type="weekly-problem"
          showAuthor={false}
        />
      )}
    </div>
  );
};

export default Create;
