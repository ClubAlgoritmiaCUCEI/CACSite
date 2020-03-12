import React, { useContext, useState, useRef, useEffect } from "react";

import { useMediaQuery } from "react-responsive";

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import Post from "../../Components/post";

import "./style.css";

const Home = ({ Fallback }) => {
  const posts = useContext(PostsContext);
  const allUsers = useContext(AllUsersContext);
  const user = useContext(UserContext);
  const [postSelected, setPostSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const postRef = useRef(null);
  const redirectOnClick = useMediaQuery({ query: "(max-width: 980px)" });
  const history = useHistory();

  useOutsideAlerter(postRef, () => setIsOpen(false));

  useEffect(() => {
    posts.fetch.home();
  }, [posts.fetch]);

  const handlePostClick = id => {
    if (redirectOnClick) {
      history.push(`/posts/${id}`);
    } else {
      setIsOpen(true);
      setPostSelected(id);
    }
  };
  return (
    <div className="cac_home">
      {isOpen && (
        <div className="cac_home_background-black">
          <div className="cac_home_post-container" ref={postRef}>
            <Post
              allUsers={allUsers.usersMap}
              className="cac_home_post"
              data={posts.posts.home.find(post => post.id === postSelected)}
              cropContent={false}
              showCommentaries={true}
              user={user}
              parentHandleDelete={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
      {!user.isLoading &&
      posts.posts.home.length > 0 &&
      Object.keys(allUsers.usersMap).length > 0 ? (
        posts.posts.home.map((post, i) => (
          <Post
            user={user}
            key={i}
            data={post}
            allUsers={allUsers.usersMap}
            cropContent={true}
            onClick={() => handlePostClick(post.id)}
            showCommentaries={false}
          />
        ))
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default Home;
