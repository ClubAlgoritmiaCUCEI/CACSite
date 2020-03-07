import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../../firebase";

import { PostsContext } from "../../../Providers/postsProvider";

import { UserContext, AllUsersContext } from "../../../Providers/userProvider";

import Post from "../../post";

const HomePost = ({ match }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    posts.fetch.public();
  }, [posts.fetch]);

  useEffect(() => {
    let destroyerFunction = () => null;
    const fetchPost = async () => {
      const postsRef = firestore.doc(`posts/${id}`);
      try {
        destroyerFunction = postsRef.onSnapshot(async snapshot => {
          setPostData(snapshot.data());
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.length !== 0) {
      const post = posts.posts.home.find(p => p.id === id);
      if (post) setPostData(post);
      else fetchPost();
    }
    return destroyerFunction;
  }, [posts, id]);
  return (
    <>
      {postData && !user.isLoading && (
        <Post
          enableLink={false}
          allUsers={allUsers.usersMap}
          className="cac_home_post"
          data={postData}
          cropContent={false}
          showCommentaries={true}
          user={user}
        />
      )}
    </>
  );
};

export default HomePost;
