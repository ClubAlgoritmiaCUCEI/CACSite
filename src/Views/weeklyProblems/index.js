import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../../Components/post";

import "./style.css";

const WeeklyProblems = () => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [redirect, setRedirect] = useState({ enable: false, to: "" });

  useEffect(() => {
    posts.fetch.weeklyProblems();
  }, [posts.fetch]);

  const handlePostClick = id => {
    setRedirect({ enable: true, to: `/weekly-problem/${id}` });
  };
  console.log(posts.posts.weeklyProblems);
  return (
    <div className="cac_weekly">
      {redirect.enable && <Redirect to={redirect.to} />}
      {!user.isLoading &&
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
        })}
    </div>
  );
};

export default WeeklyProblems;
