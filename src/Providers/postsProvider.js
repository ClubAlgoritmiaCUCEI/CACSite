import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [weeklyProblems, setWeeklyProblems] = useState([]);
  const [status, setStatus] = useState({
    public: false,
    home: false,
    weeklyProblems: false
  });

  const fetchPublicPosts = () => {
    if (!status.public) {
      setStatus(s => ({ ...s, public: true }));
    }
  };
  const fetchHomePosts = () => {
    if (!status.home) {
      setStatus(s => ({ ...s, home: true }));
    }
  };

  const fetchWeeklyProblems = () => {
    if (!status.weeklyProblems) {
      setStatus(s => ({ ...s, weeklyProblems: true }));
    }
  };

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("posts")
        .orderBy("timestamp", "desc")
        .limit(10);
      destroyerFunction = postsRef.onSnapshot(async snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setHomePosts(fetchedData);
      });
    };
    if (status.home) {
      init();
    }
    return destroyerFunction;
  }, [status.home]);

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("public")
        .orderBy("timestamp", "desc")
        .limit(10);
      destroyerFunction = postsRef.onSnapshot(async snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setPublicPosts(fetchedData);
      });
    };
    if (status.public) {
      init();
    }
    return destroyerFunction;
  }, [status.public]);

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("weekly-problems")
        .orderBy("timestamp", "desc")
        .limit(10);
      console.log(postsRef);
      destroyerFunction = postsRef.onSnapshot(async snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setWeeklyProblems(fetchedData);
      });
    };
    if (status.weeklyProblems) {
      init();
    }
    return destroyerFunction;
  }, [status.weeklyProblems]);

  useEffect(() => {});
  return (
    <PostsContext.Provider
      value={{
        posts: {
          public: publicPosts,
          home: homePosts,
          weeklyProblems: weeklyProblems
        },
        fetch: {
          public: fetchPublicPosts,
          home: fetchHomePosts,
          weeklyProblems: fetchWeeklyProblems
        },
        status: status
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
