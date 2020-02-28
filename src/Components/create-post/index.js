import React, { useState, useContext } from "react";

import { firestore, firebase } from "../../firebase";

import { UserContext } from "../../Providers/userProvider";

import Post from "../post";
import Button from "../button";
import { TopPopup } from "../popup";

import "./style.css";
import "../../Views/create/style.css";

const CreatePost = ({
  preview,
  type = "home",
  to = "posts",
  showAuthor = true
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [alert, setAlert] = useState({ visible: false, content: "", type: "" });
  const user = useContext(UserContext);

  const handlePostButton = async () => {
    if (!isSubmiting && title && content) {
      setIsSubmiting(true);
      const postData = {
        title,
        content,
        type: type,
        comments: [],
        likesList: [],
        likesCounter: 0,
        author: { id: user.uid, displayName: user.displayName },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        key: Date.now()
      };
      try {
        await firestore.collection(to).add(postData);
        setAlert({
          visible: true,
          content: "Post published succesfully",
          type: "success"
        });
        setTitle("");
        setContent("");
      } catch (e) {
        console.error(e);
        setAlert({
          visible: true,
          content: "Error publishing post",
          type: "error"
        });
      }
      setIsSubmiting(false);
    }
  };

  return (
    <>
      {alert.visible && (
        <TopPopup
          className={alert.type}
          onClick={() => setAlert({ visible: false })}
        >
          {alert.content}
        </TopPopup>
      )}
      {preview ? (
        <Post
          preview={true}
          allUsers={{}}
          enableLink={false}
          showAuthor={showAuthor}
          data={{
            title: title,
            author: user,
            content: content,
            date: "just now"
          }}
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
              Content
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
