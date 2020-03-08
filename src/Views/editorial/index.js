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

const Editorial = ({ Fallback }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const history = useHistory();

  useEffect(() => {
    posts.fetch.editorial();
  }, [posts.fetch]);

  const handlePostClick = id => {
    history.push(`/editorial/${id}`);
  };
  return (
    <div className="cac_editorial">
      {!user.isLoading && posts.posts.editorial.length > 0 ? (
        posts.posts.editorial.map((postData, i) => {
          return (
            <Post
              user={user}
              key={i}
              showAuthor={false}
              data={postData}
              allUsers={allUsers.usersMap}
              cropContent={true}
              onClick={() => handlePostClick(postData.id)}
              showCommentaries={false}
              from="editorial"
            />
          );
        })
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default Editorial;
