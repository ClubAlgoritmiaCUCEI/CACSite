import React, { useContext, useEffect, useState, useRef } from "react";

import { useMediaQuery } from "react-responsive";

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

import { firestore, firebase } from "../../firebase";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import Button from "../../Components/button";
import Post from "../../Components/post";
import { TopPopup } from "../../Components/popup";

import "./style.css";

const Public = ({ Fallback }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [alert, setAlert] = useState({ visible: false, content: "", type: "" });
  const [postSelected, setPostSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const postRef = useRef(null);
  const redirectOnClick = useMediaQuery({ query: "(max-width: 980px)" });
  const history = useHistory();

  useEffect(() => {
    posts.fetch.public();
  }, [posts.fetch]);

  const handleUserCreate = e => {
    setEditing(true);
    setTitle(e.target.value);
  };

  const clearData = () => {
    setTitle("");
    setContent("");
    setEditing("");
  };

  const handlePost = () => {
    const post = async () => {
      setIsPosting(true);
      const postData = {
        title,
        content,
        type: "public-post",
        comments: [],
        likesList: [],
        likesCounter: 0,
        author: { id: user.uid, displayName: user.displayName },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        key: Date.now()
      };
      try {
        await firestore.collection("public").add(postData);
        setAlert({
          visible: true,
          content: "Post published succesfully",
          type: "success"
        });
        clearData();
      } catch (e) {
        console.error(e);
        setAlert({
          visible: true,
          content: "Error publishing post",
          type: "error"
        });
      }
      setIsPosting(false);
    };
    if (!user.logged) {
      setAlert({
        visible: true,
        type: "error",
        content: "You need to sign in to post"
      });
    } else if (!(isPosting || title === "" || content === "")) {
      post();
    }
  };

  const handlePostClick = id => {
    if (redirectOnClick) {
      history.push(`/public/${id}`);
    } else {
      setPostSelected(id);
      setIsOpen(true);
    }
  };
  useOutsideAlerter(postRef, () => setIsOpen(false));

  return (
    <div className="cac_public">
      {isOpen && (
        <div className="cac_public_background-black">
          <div className="cac_public_post-container" ref={postRef}>
            <Post
              allUsers={allUsers.usersMap}
              className="cac_public_post"
              data={posts.posts.public.find(post => post.id === postSelected)}
              cropContent={false}
              showCommentaries={true}
              user={user}
              from="public"
            />
          </div>
        </div>
      )}
      {alert.visible && (
        <TopPopup
          className={alert.type}
          onClick={() => setAlert({ visible: false })}
        >
          {alert.content}
        </TopPopup>
      )}
      {editing ? (
        <div className="cac_public_create cac_public_create--creating">
          <textarea
            className="cac_public_create_text-area cac_public_create_text-area--title"
            value={title}
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="cac_public_create_text-area cac_public_create_text-area--content"
            value={content}
            placeholder="Content (Markdown)"
            onChange={e => setContent(e.target.value)}
          />
          <Button
            className={`cac_public_create_button cac_public_create_button--post ${
              isPosting || title === "" || content === ""
                ? "cac_public_create_button--disabled"
                : ""
            }`}
            onClick={handlePost}
          >
            Post
          </Button>
          <Button
            className="cac_public_create_button cac_public_create_button--cancel"
            onClick={clearData}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="cac_public_create cac_public_create--default">
          <textarea
            className="cac_public_create_text-area cac_public_create_text-area--title"
            value=""
            onChange={handleUserCreate}
            onClick={() => setEditing(true)}
            placeholder="Create Post"
          />
          <Button className="cac_public_create_button  cac_public_create_button--post cac_public_create_button--disabled">
            Post
          </Button>
        </div>
      )}
      <div className="cac_public_posts">
        {!user.isLoading &&
        posts.posts.public.length > 0 &&
        Object.keys(allUsers.usersMap).length > 0 ? (
          posts.posts.public.map((postData, i) => {
            return (
              <Post
                user={user}
                key={i}
                data={postData}
                allUsers={allUsers.usersMap}
                cropContent={true}
                onClick={() => handlePostClick(postData.id)}
                showCommentaries={false}
                from="public"
              />
            );
          })
        ) : (
          <Fallback />
        )}
      </div>
    </div>
  );
};

export default Public;
