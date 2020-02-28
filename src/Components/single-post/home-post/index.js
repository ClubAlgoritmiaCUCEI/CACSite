import React, { useContext, useEffect, useState } from "react";

import { firestore } from "../../../firebase";

import { PostsContext } from "../../../Providers/postsProviders";
import { UserContext, AllUsersContext } from "../../../Providers/userProvider";

import Post from "../../post";

const HomePost = ({ match }) => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    let destroyerFunction = () => null;
    const fetchPost = async () => {
      const postsRef = firestore.doc(`posts/${id}`);
      try {
        destroyerFunction = postsRef.onSnapshot(async snapshot => {
          const fetchedData = [];
          snapshot.forEach(doc => {
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setPostData(fetchedData);
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (posts.length !== 0) {
      const post = posts.find(p => p.id === id);
      console.log(post);
      if (post) setPostData(post);
      else fetchPost();
    }
    return destroyerFunction;
  }, [posts, id]);
  console.log(postData);
  return (
    <div className="cac_home-post">
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
    </div>
  );
};

export default HomePost;
