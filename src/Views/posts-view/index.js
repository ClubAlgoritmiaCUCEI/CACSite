import React, { useContext, useEffect, useState, useRef } from "react";

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";


import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../../Components/post";
import CreatePostSmall from '../../Components/create-post-small';

import "./style.css";

const PostsView = ({ className = "", Fallback, from, type, showAuthor = false, enableCreate = false, enablePreview = true }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [postOpen, setPostOpen] = useState({});

  const wrapperRef = useRef(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));


  useEffect(() => {
    if (posts.status.IDB)
      posts.fetch(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, posts.status.IDB]);

  const handlePostClick = (postData) => {
    if (enablePreview && !isTabletOrMobile) {
      console.log("click");
      setPostOpen(postData);
      setIsOpen(true);
    }
    else history.push(`/${from}/${postData.id}`);
  };

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
    return () => null;
  }, [isOpen])

  return (
    <div className={`cac_posts ${className}`}>

      {enableCreate && <CreatePostSmall type={type} user={user} />}
      {!user.isLoading && posts.status[type] ? (
        posts.posts[type].map((postData, i) => {
          return (
            <Post
              user={user}
              key={i}
              showAuthor={showAuthor}
              data={postData}
              allUsers={allUsers.usersMap}
              cropContent={true}
              onClick={() => handlePostClick(postData)}
              showCommentaries={false}
              from={from}
            />
          );
        })

      ) : (
          <Fallback />
        )}
      {isOpen && (
        <div className="cac_posts_background-black" >
          <div className="cac_post-open_container" ref={wrapperRef}>
            <Post
              user={user}
              key={postOpen.id}
              showAuthor={showAuthor}
              className="cac_posts_post-open"
              data={postOpen}
              allUsers={allUsers.usersMap}
              cropContent={false}
              showCommentaries={true}
              from={from}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsView;
