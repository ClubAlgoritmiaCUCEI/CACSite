import React, { createContext, useEffect, useState, useContext } from "react";
import { auth, getUserDocument, firestore } from "../firebase.js";

import { IDBContext } from './IDBProvider';

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
    let unsubscribeFromAuth = () => null;
    let unsubscribeFromNotifications = () => null;
    try {
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth != null) {
          setUser({ isLoading: true, logged: true, isCFLoading: true });
          try {
            const userDocument = await getUserDocument(userAuth);
            console.log("Read 1 document");
            if (userDocument !== undefined) {
              setUser({
                saved: [],
                ...userDocument,
                photoURL: userDocument.photoURL || defaultImage,
                isLoading: false,
                logged: true,
                isCFLoading: true
              });
              //getting the notifications
              const notificationsRef = firestore.collection("notifications").doc(userDocument.uid);
              notificationsRef.onSnapshot(doc => {
                const data = doc.data() || { notificationsList: [], unread: 0 }
                const notificationsList = data.notificationsList.sort((a, b) => b.at.lastUserFetchedseconds - a.at.lastUserFetchedseconds);
                console.log(`Read ${notificationsList.length} documents`);
                setUser(u => ({ ...u, notifications: { notificationsList: notificationsList, unread: data.unread } }))
              })
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
    } catch (e) {
      console.log(e);
    }

    return () => {
      unsubscribeFromAuth();
      unsubscribeFromNotifications();
    }
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;

export const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = useState({
    isLoading: true,
    isCFLoading: true,
    usersWithCFAccount: [],
    usersMap: {}
  });

  const IDB = useContext(IDBContext);

  useEffect(() => {
    if (!IDB.users.ready) return
    const usersMap = {};
    let lastUserFetchedseconds = window.localStorage.getItem("lastUserFetch");
    let lastFetch = new Date();
    lastFetch.setTime(lastUserFetchedseconds)
    IDB.dataForEach('users', user => usersMap[user.id] = user);

    const fetchData = async () => {
      const fetchedUsers = [];
      await firestore
        .collection("users")
        .where("timestamp", ">", lastFetch)
        .get()
        .then(querySnapshot => {
          console.log(`Read ${querySnapshot.size} documents at All Users Provider`);
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
          if (querySnapshot.size > 0)
            window.localStorage.setItem("lastUserFetch", lastUserFetchedseconds + 1000);
        });

      setUsers(c => ({
        ...c,
        isLoading: false,
        users: fetchedUsers,
        usersMap: usersMap
      }));


      /// set state and then fetch users that have an acount on codeforces
      const usersWithCFAccount = []
      let usersQuery = ""
      for (let user in usersMap) {
        const cfUsername = usersMap[user].codeForcesUsername;
        if (cfUsername) {
          usersWithCFAccount.push(user)
          usersQuery += `;${cfUsername}`
        }
      }
      fetch(API + DEFAULT_QUERY + usersQuery)
        .then(res => res.json())
        .then(data => {
          usersWithCFAccount.forEach((userId, i) => {
            usersMap[userId] = { ...usersMap[userId], ...data.result[i] }
            usersWithCFAccount.push(usersMap[userId]);
          });
          setUsers(c => ({
            ...c,
            isCFLoading: false,
            usersWithCFAccount: usersWithCFAccount,
            usersMap: usersMap
          }));
        });
    };
    fetchData();
  }, [IDB.users.ready]);
  return (
    <AllUsersContext.Provider value={users}>
      {children}
    </AllUsersContext.Provider>
  );
};
