import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const fetchedData = [];
      const postsRef = firestore
        .collection("posts")
        .orderBy("timestamp", "desc")
        .limitToLast(10);
      const snapshot = await postsRef.get();
      snapshot.forEach(doc => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedData);
    };
    init();
  }, []);

  useEffect(() => {});
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
export default PostsProvider;
