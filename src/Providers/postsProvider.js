import React, { createContext, useContext, useState, useEffect } from "react";

import { IDBContext } from './IDBProvider';

import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const IDB = useContext(IDBContext);

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



    if (!IDB.posts.ready) {
      setTimeout(() => fetch(type, again), 100);
      console.log("Another fetch...");
      return;
    }
    if (!again && (status[type] || fetching[type])) return;

    let lastPostFetchedseconds = window.localStorage.getItem("lastPostFetch");
    if (lastPostFetchedseconds > Date.now()) lastPostFetchedseconds = 0;

    let lastFetch = new Date();
    lastFetch.setTime(lastPostFetchedseconds);

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
