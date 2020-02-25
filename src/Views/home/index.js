import React, { useContext, useState, useRef } from "react";

import { PostsContext } from "../../Providers/postsProviders";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import Post from "../../Components/post";

import "./style.css";

const Home = () => {
  const posts = useContext(PostsContext);
  const allUsers = useContext(AllUsersContext);
  const user = useContext(UserContext);
  const [postData, setPostData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const postRef = useRef(null);

  useOutsideAlerter(postRef, () => setIsOpen(false));

  const handlePostClick = postData => {
    setPostData(postData);
    setIsOpen(true);
  };
  return (
    <div className="cac_home">
      {isOpen && (
        <div className="cac_home_background-black">
          <div className="cac_home_post-container" ref={postRef}>
            <Post
              allUsers={allUsers.usersMap}
              className="cac_home_post"
              data={postData}
              cropContent={false}
              showComments={true}
              user={user}
            />
          </div>
        </div>
      )}

      {!user.isLoading &&
        posts.map((post, i) => (
          <Post
            user={user}
            key={i}
            data={post}
            allUsers={allUsers.usersMap}
            cropContent={true}
            onClick={() => handlePostClick(post)}
            showComments={false}
          />
        ))}
    </div>
  );
};

export default Home;
