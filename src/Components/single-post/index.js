import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../firebase";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../post";

const SinglePostView = ({ match, from, type }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(undefined);
  const { id } = match.params;

  useEffect(() => {
    let destroyerFunction = () => null;
    const fetchPost = async () => {
      const postsRef = firestore.doc(`test-posts/${id}`);
      try {
        destroyerFunction = postsRef.onSnapshot(async snapshot => {
          setPostData({ id: snapshot.id, ...snapshot.data() });
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.status.editorial) {
      const post = posts.posts.editorial.find(p => p.id === id);
      if (post) setPostData(post);
      else fetchPost();
    } else {
      fetchPost();
    }
    return destroyerFunction;
  }, [id, posts, from]);

  return (
    <>
      {postData && !user.isLoading && (
        <Post
          enableLink={false}
          showAuthor={false}
          allUsers={allUsers.usersMap}
          data={postData}
          from={from}
          cropContent={false}
          showCommentaries={true}
          user={user}
        />
      )}
    </>
  );
};

export default SinglePostView;
