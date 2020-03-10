import React, { createContext, useEffect, useState } from "react";
import { auth, getUserDocument, firestore } from "../firebase.js";

import defaultImage from "../assets/default-photo.jpg";

export const UserContext = createContext({});
export const AllUsersContext = createContext({});

const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.info?handles=";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoading: true,
    logged: undefined,
    isCFLoading: true
  });

  useEffect(() => {
    let unsubscribeFromAuth;
    try {
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth != null) {
          setUser({ isLoading: true, logged: true, isCFLoading: true });
          try {
            const userDocument = await getUserDocument(userAuth);
            if (userDocument !== undefined) {
              setUser({
                saved: [],
                ...userDocument,
                photoURL: userDocument.photoURL || defaultImage,
                isLoading: false,
                logged: true,
                isCFLoading: true
              });

              if (userDocument.codeForcesUsername) {
                //Fetching the CF data for the user;
                try {
                  fetch(API + DEFAULT_QUERY + userDocument.codeForcesUsername)
                    .then(res => res.json())
                    .then(data => {
                      setUser(u => ({
                        ...data.result[0],
                        ...u,
                        logged: true,
                        isLoading: false,
                        isCFLoading: false
                      }));
                    });
                } catch (e) {
                  console.error("Error fetching data from Code Forces");
                  console.error(e);
                }
              } else {
                setUser(u => ({
                  ...u,
                  isCFLoading: false
                }));
              }
            }
          } catch (e) {
            console.error(e);
          }
        } else {
          setUser({ isLoading: false, logged: false });
        }
      });
      return unsubscribeFromAuth;
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;

export const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = useState({
    isLoading: true,
    users: [],
    isCFLoading: true,
    usersWithCFAccount: [],
    usersMap: {}
  });

  useEffect(() => {
    const usersMap = {};
    const fetchData = async () => {
      const fetchedUsers = [];
      //// fetch users from firebase
      await firestore
        .collection("users")
        .get()
        .then(querySnapshot => {
          for (let i = 0; i < querySnapshot.size; i++) {
            const doc = querySnapshot.docs[i];
            usersMap[doc.id] = { ...doc.data(), id: doc.id };
            fetchedUsers.push({
              id: doc.id,
              saved: [],
              ...doc.data(),
              index: i
            });
          }
        });
      setUsers(c => ({ ...c, isLoading: false, users: fetchedUsers }));

      /// set state and then fetch users that have an acount on codeforces
      let usersWithCFAccount = fetchedUsers.filter(
        user => user.codeForcesUsername
      );
      let usersQuery = fetchedUsers.reduce(
        (acc, user) => `${acc};${user.codeForcesUsername || ""}`,
        ""
      );

      fetch(API + DEFAULT_QUERY + usersQuery)
        .then(res => res.json())
        .then(data => {
          let usersOnlyWithCFMaped = usersWithCFAccount.map((user, i) => ({
            ...data.result[i],
            ...user
          }));
          const usersCopy = fetchedUsers;
          usersOnlyWithCFMaped.forEach(user => {
            usersMap[user.id] = { ...usersMap[user.id], ...user };
            usersCopy[user.index] = { ...usersCopy[user.index], ...user };
          });
          setUsers(c => ({
            ...c,
            users: usersCopy,
            isCFLoading: false,
            usersWithCFAccount: usersOnlyWithCFMaped,
            usersMap: usersMap
          }));
        });
    };
    fetchData();
  }, []);
  return (
    <AllUsersContext.Provider value={users}>
      {children}
    </AllUsersContext.Provider>
  );
};
