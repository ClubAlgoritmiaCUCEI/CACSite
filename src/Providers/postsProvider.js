import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [weeklyProblems, setWeeklyProblems] = useState([]);
  const [editorial, setEditorial] = useState([]);
  const [status, setStatus] = useState({
    public: false,
    home: false,
    weeklyProblems: false,
    editorial: false
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

  const fetchEditorial = () => {
    if (!status.editorial) {
      setStatus(s => ({ ...s, editorial: true }));
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
        console.log("ready");
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

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("editorial")
        .orderBy("timestamp", "desc")
        .limit(10);
      destroyerFunction = postsRef.onSnapshot(async snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setEditorial(fetchedData);
      });
    };
    if (status.editorial) {
      init();
    }
    return destroyerFunction;
  }, [status.editorial]);

  useEffect(() => {});
  return (
    <PostsContext.Provider
      value={{
        posts: {
          public: publicPosts,
          home: homePosts,
          weeklyProblems: weeklyProblems,
          editorial: editorial
        },
        fetch: {
          public: fetchPublicPosts,
          home: fetchHomePosts,
          weeklyProblems: fetchWeeklyProblems,
          editorial: fetchEditorial
        },
        status: status
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
