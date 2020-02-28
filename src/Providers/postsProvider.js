import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext({});

const PostsProvider = ({ children }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [status, setStatus] = useState({ public: false, home: false });

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

  useEffect(() => {});
  return (
    <PostsContext.Provider
      value={{
        posts: { public: publicPosts, home: homePosts },
        fetch: { public: fetchPublicPosts, home: fetchHomePosts },
        status: status
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
