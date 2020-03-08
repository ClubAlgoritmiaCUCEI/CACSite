import React, { useContext, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../../Components/post";

import "./style.css";

const WeeklyProblems = ({ Fallback }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const history = useHistory();

  useEffect(() => {
    posts.fetch.weeklyProblems();
  }, [posts.fetch]);

  const handlePostClick = id => {
    history.push(`/weekly-problems/${id}`);
  };
  return (
    <div className="cac_weekly">
      {!user.isLoading && posts.posts.weeklyProblems.length > 0 ? (
        posts.posts.weeklyProblems.map((postData, i) => {
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
              from="weekly-problems"
            />
          );
        })
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default WeeklyProblems;
