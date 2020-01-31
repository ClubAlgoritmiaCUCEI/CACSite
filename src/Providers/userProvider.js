import React, { createContext, useEffect, useState } from "react";
import { auth, createUserProfileDocument } from "../firebase.js";

export const UserContext = createContext({});

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
