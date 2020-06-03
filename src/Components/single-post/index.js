import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../firebase";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../post";

const SinglePostView = ({ match, from, Fallback, showAuthor = false }) => {
  const { id } = match.params;
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(undefined);


  useEffect(() => {
    const fetchPost = async () => {
      const postsRef = firestore.doc(`test-posts/${id}`);
      try {
        const snap = await postsRef.get();
        setPostData({ id: snap.id, ...snap.data() });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.status.editorial) {
      const post = posts.posts.editorial.find(p => p.id === id);
      if (post) {
        setPostData(post);
      }
      else fetchPost();
    } else {
      fetchPost();
    }
  }, [id, posts, from]);

  return (
    <>
      {!user.isLoading && !allUsers.isLoading && postData ? (
        <Post
          enableLink={false}
          showAuthor={showAuthor}
          allUsers={allUsers.usersMap}
          data={postData}
          from={from}
          cropContent={false}
          showCommentaries={true}
          user={user}
        />
      ) : <Fallback />}
    </>
  );
};

export default SinglePostView;
