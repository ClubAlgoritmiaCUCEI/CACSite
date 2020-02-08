import React, { createContext, useEffect, useState } from "react";
import { auth, createUserProfileDocument, firestore } from "../firebase.js";

export const UserContext = createContext({});

export const AllUsersContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoading: true });

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth != null) {
        setUser({ isLoading: true, logged: true });
        const userDocument = await createUserProfileDocument(userAuth);
        setUser({ ...userDocument, isLoading: false, logged: true });
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
