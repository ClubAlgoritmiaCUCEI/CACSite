import React, { useContext, useEffect, useState } from "react";

import { firestore, firebase } from "../../firebase";

import { v4 as uuidv4 } from "uuid";

import { PostsContext } from "../../Providers/postsProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Post from "../post";

const SinglePostView = ({ match, from, Fallback, showAuthor = false }) => {
  const { id } = match.params;
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [postData, setPostData] = useState(undefined);
  const [commentaries, setCommentaries] = useState([]);
  const [isCommentariesLoading, setIsCommentariesLoading] = useState(true);
  const [publishingCommentary, setPublishingCommentary] = useState(false);

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

  useEffect(() => {
    let destroyer = () => null;
    const fetchCommentaries = async () => {
      const commentariesRef = firestore.doc(`commentaries/${id}`);
      try {
        destroyer = await commentariesRef.onSnapshot(snap => {
          console.log(snap.data());
          setCommentaries(snap.data().commentaries);
          setIsCommentariesLoading(false);
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchCommentaries();
    return destroyer;
  }, [id])

  const handleAddCommentary = (textValue) => {
    const publish = async () => {
      setPublishingCommentary(true);
      const postRef = firestore.doc(`commentaries/${postData.id}`);
      const commentContent = {
        id: uuidv4(),
        author: user.uid,
        content: textValue,
        date: new Date()
      };
      await postRef.update({
        commentaries: firebase.firestore.FieldValue.arrayUnion(commentContent)
      });
      setPublishingCommentary(false);
    };
    if (!publishingCommentary && textValue) publish();
  }


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
          commentary={{ showCommentaries: true, handleAddCommentary, isLoading: isCommentariesLoading, data: commentaries }}
          user={user}
        />
      ) : <Fallback />}
    </>
  );
};

export default SinglePostView;
