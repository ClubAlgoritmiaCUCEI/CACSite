import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const OtherPostsContext = createContext({});

const OtherPostsProvider = ({ children }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [status, setStatus] = useState({ public: false });

  const fetchPublicPosts = () => {
    if (!status.public) {
      setStatus(s => ({ ...s, public: true }));
    }
  };

  useEffect(() => {
    let destroyerFunction = () => null;
    const init = async () => {
      const postsRef = firestore
        .collection("public")
        .orderBy("timestamp", "desc")
        .limitToLast(10);
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
    <OtherPostsContext.Provider
      value={{
        posts: { public: publicPosts },
        fetch: { public: fetchPublicPosts }
      }}
    >
      {children}
    </OtherPostsContext.Provider>
  );
};
export default OtherPostsProvider;
