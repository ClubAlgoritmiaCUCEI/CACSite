import React, { useContext } from "react";

import { PostsContext } from "../../Providers/postsProviders";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../../Components/post";

import "./style.css";

const Home = () => {
  const posts = useContext(PostsContext);
  const allUsers = useContext(AllUsersContext);
  const user = useContext(UserContext);
  return (
    <div className="cac_home">
      {posts.map((post, i) => (
        <Post user={user} key={i} data={post} allUsers={allUsers.usersMap} />
      ))}
    </div>
  );
};

export default Home;
