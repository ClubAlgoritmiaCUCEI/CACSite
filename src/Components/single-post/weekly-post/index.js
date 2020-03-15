import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../../firebase";

import { PostsContext } from "../../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../../Providers/userProvider";

import Post from "../../post";

const WeeklyPost = ({ match }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(undefined);
  const { id } = match.params;

  useEffect(() => {
    posts.fetch.weeklyProblems();
  }, [posts.fetch]);

  useEffect(() => {
    let destroyerFunction = () => null;
    const fetchPost = async () => {
      const postsRef = firestore.doc(`weekly-problems/${id}`);
      try {
        destroyerFunction = postsRef.onSnapshot(async snapshot => {
          setPostData({ id: snapshot.id, ...snapshot.data() });
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.status.weeklyProblems) {
      const post = posts.posts.weeklyProblems.find(p => p.id === id);
      if (post) setPostData(post);
      else fetchPost();
    }
    return destroyerFunction;
  }, [id, posts]);

  return (
    <>
      {postData && !user.isLoading && (
        <Post
          enableLink={false}
          showAuthor={false}
          allUsers={allUsers.usersMap}
          className="cac_home_post"
          data={postData}
          from="weekly-problems"
          cropContent={false}
          showCommentaries={true}
          user={user}
        />
      )}
    </>
  );
};

export default WeeklyPost;
