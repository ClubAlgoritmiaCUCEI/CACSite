import React, { createContext, useEffect, useState } from "react";
import { auth, getUserDocument, firestore } from "../firebase.js";

import defaultImage from "../assets/default-photo.jpg";

export const UserContext = createContext({});

export const AllUsersContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoading: true });

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth != null) {
        setUser({ isLoading: true, logged: true });
        const userDocument = await getUserDocument(userAuth);
        setUser({
          ...userDocument,
          photoURL: userDocument.photoURL || defaultImage,
          isLoading: false,
          logged: true
        });
      } else {
        setUser({ isLoading: false, logged: false });
      }
    });
    return unsubscribeFromAuth;
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;

export const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = useState({ isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      await firestore
        .collection("users")
        .get()
        .then(querySnapshot =>
          querySnapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
        );
      setUsers({ isLoading: false, users: data });
    };
    fetchData();
  }, []);
  return (
    <AllUsersContext.Provider value={users}>
      {children}
    </AllUsersContext.Provider>
  );
};
