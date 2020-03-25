import React, { useContext, useEffect } from "react";

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../../Components/post";

import "./style.css";

const PostsView = ({ className = "", Fallback, from, type, showAuthor = false }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const history = useHistory();

  useEffect(() => {
    posts.fetch(type);
    console.log(type);
  }, [posts, type]);
  console.log(posts);

  const handlePostClick = id => {
    history.push(`/${from}/${id}`);
  };
  return (
    <div className={`cac_posts ${className}`}>
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
              onClick={() => handlePostClick(postData.id)}
              showCommentaries={false}
              from={from}
            />
          );
        })
      ) : (
          <Fallback />
        )}
    </div>
  );
};

export default PostsView;
