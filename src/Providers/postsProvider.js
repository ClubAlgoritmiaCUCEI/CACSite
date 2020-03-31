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
    editorial: false,
    IDB: false,
  });
  const [fetching, setFetching] = useState({
    public: false,
    home: false,
    weeklyProblems: false,
    editorial: false
  })
  const [posts, setPosts] = useState({
    public: [],
    home: [],
    weeklyProblems: [],
    editorial: []
  });

  useEffect(() => {
    if (status.IDB) return;
    if (IDB.posts.ready) setStatus(s => ({ ...s, IDB: true }));
  }, [IDB, status.IDB])

  const fetch = async (type, again = false) => {
    /// Checkint if should fetch data from firebase or IDB

    if (!IDB.posts.ready || status[type] || fetching[type]) return;
    setFetching(s => ({ ...s, [type]: true }));

    const posts = [];

    await IDB.deleteData('posts', "xv7KN3ol57Od3IHhcyFg");
    await IDB.dataForEachConditional('posts', e => posts.push(e), 'type', 'only', type);
    console.log(posts);
    posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

    setPosts(p => ({ ...p, [type]: posts }));
    setFetching(s => ({ ...s, [type]: false }));
    setStatus(s => ({ ...s, [type]: true }));

    /// Checking last fetch
    let lastPostFetchedseconds = window.localStorage.getItem(`lastPostsFetch-${type}`);
    if (lastPostFetchedseconds > Date.now()) lastPostFetchedseconds = 0;

    let lastFetch = new Date();
    lastFetch.setTime(lastPostFetchedseconds);

    /// Fetching
    const fetchedPosts = []
    const postsRef = firestore
      .collection("test-posts")
      .where("timestamp", ">", lastFetch)
      .where("type", "==", type)
      .orderBy("timestamp", 'desc')
      .limit(10);
    const postsSnap = await postsRef.get();
    console.log(`Read ${postsSnap.docs.length} document at ${type}`);
    postsSnap.docs.forEach(doc => {
      lastPostFetchedseconds = Math.max(lastPostFetchedseconds, doc.data().timestamp.seconds * 1000);
      const data = { ...doc.data(), id: doc.id };
      IDB.addData('posts', data)
      fetchedPosts.push(data)
    });

    //updating the changed posts
    fetchedPosts.forEach(post => {
      console.log(post);
      const index = posts.findIndex(p => p.id === post.id);
      if (index === -1)
        posts.unshift(post);
      else posts[index] = post;
    })
    posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    window.localStorage.setItem(`lastPostsFetch-${type}`, Number(lastPostFetchedseconds) + 500);

    /// Set data in state
    setPosts(p => ({ ...p, [type]: posts }));

  }
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
