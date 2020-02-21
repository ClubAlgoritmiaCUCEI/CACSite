import React, { useState } from "react";

import { firestore } from "../../firebase";

import Post from "../post";
import Button from "../button";
import UserBox from "../user-box";
import Popup from "../popup";

import "./style.css";
import "../../Views/create/style.css";


const CreatePost = ({ preview }) => {
  const [title, setTitle] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [content, setContent] = useState("");

  const handlePostButton = async () => {
    if (!isSubmiting) {
      setIsSubmiting(true);
      const postData = {
        title
      };

      setIsSubmiting(false);
    }
  };

  console.log("???");
  return (
    <>
      {preview ? (
        <Post
          preview={true}
          data={{ title: title }}
        />
      ) : (
          <div className="cac_create_post">
            <div className="cac_create_section">
              <label htmlFor="title" className="cac_create_title">
                Title
              </label>
              <input
                name="title"
                id="title"
                type="text"
                className="cac_create_input cac_create_input--title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="cac_create_section">
              <label htmlFor="description" className="cac_create_title">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="cac_create_textarea"
                value={content}
                required
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
        )}
      <Button className="cac_create_post_post" onClick={handlePostButton}>
        Post
      </Button>
    </>
  );
};

export default CreatePost;
