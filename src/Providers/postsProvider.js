import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {

  const [status, setStatus] = useState({
    public: false,
    home: false,
    weeklyProblems: false,
    editorial: false
  });
  const [fetching, setFetching] = useState({
    public: false,
    home: false,
    weeklyProblems: false,
    editorial: false
  })
  const [posts, setPosts] = useState({});

  const fetch = async (type, again = false) => {
    if (!again && (status[type] || fetching[type])) return;

    setFetching(s => ({ ...s, [type]: true }));
    const postsRef = firestore
      .collection("test-posts")
      .where("type", "==", type)
      .orderBy("createdAt", "desc")
      .limit(10);
    const postsSnap = await postsRef.get();
    const posts = [];
    postsSnap.docs.forEach(doc => posts.push({ ...doc.data(), id: doc.id }));
    setPosts(p => ({ ...p, [type]: posts }));
    setFetching(s => ({ ...s, [type]: false }));
    setStatus(s => ({ ...s, [type]: true }));
  }

  useEffect(() => { });
  return (
    <PostsContext.Provider
      value={{
        posts,
        fetch,
        status: status
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
