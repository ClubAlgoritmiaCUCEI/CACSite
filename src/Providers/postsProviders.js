import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("posts")
        .orderBy("timestamp", "desc")
        .limitToLast(10);
      destroyerFunction = postsRef.onSnapshot(async snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        console.log(fetchedData);
        setPosts(fetchedData);
      });
    };
    init();
    return destroyerFunction;
  }, []);

  useEffect(() => {});
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
export default PostsProvider;
