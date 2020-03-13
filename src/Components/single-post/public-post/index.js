import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../../firebase";

import { PostsContext } from "../../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../../Providers/userProvider";

import Post from "../../post";

const PublicPost = ({ match }) => {
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
      const postsRef = firestore.doc(`public/${id}`);
      try {
        destroyerFunction = postsRef.onSnapshot(async snapshot => {
          setPostData({ id: snapshot.id, ...snapshot.data() });
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.status.public) {
      const post = posts.posts.public.find(p => p.id === id);
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
          allUsers={allUsers.usersMap}
          className="cac_home_post"
          data={postData}
          from="public"
          cropContent={false}
          showCommentaries={true}
          user={user}
        />
      )}
    </>
  );
};

export default PublicPost;
