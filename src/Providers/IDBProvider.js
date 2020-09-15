import React, { createContext, useState, useEffect } from "react";

import { firestore } from '../firebase';

export const IDBContext = createContext({});

const IDBProvider = ({ children }) => {
  const [dataBases, setDataBases] = useState({ users: {} });
  const [users, setUsers] = useState({ ready: false });
  const [posts, setPosts] = useState({ ready: false });


  useEffect(() => {
    /// Deleting all stored data for major updates
    let lastDeepDelete = window.localStorage.getItem('deepDeleteVersion') | 0;
    if (lastDeepDelete < 1) {
      localStorage.clear();
      window.localStorage.setItem('deepDeleteVersion', 1);
    }
  }, [])

  const logAllData = (database) => {
    let objectStore = dataBases[database].transaction(database).objectStore(database);
    objectStore.openCursor().onsuccess = e => {
      let cursor = e.target.result;
      if (cursor) {
        cursor.continue();
      } else {
        console.log("All items displayed");
      }
    }
  }

  const dataForEach = (database, handler) => {
    return new Promise((resolve, reject) => {
      let objectStore = dataBases[database].transaction(database).objectStore(database);
      objectStore.openCursor().onsuccess = e => {
        let cursor = e.target.result;

        if (cursor) {
          handler(cursor.value);
          cursor.continue();
        } else {
          resolve();
        }
      }
    })
  }

  const dataForEachConditional = (database, handler, indexer, keyRangeType, ...range) => {
    return new Promise((resolve, reject) => {
      let transaction = dataBases[database].transaction(database);
      let objectStore = transaction.objectStore(database);
      let index = objectStore.index(indexer);
      let keyRange = IDBKeyRange[keyRangeType](...range);
      index.openCursor(keyRange).onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          handler(cursor.value);
          cursor.continue();
        } else {
          resolve();
        }
      }
    })
  }

  const addData = (database, item) => {
    return new Promise((resolve, reject) => {
      let transaction = dataBases[database].transaction([database], 'readwrite');
      let objectStore = transaction.objectStore(database);
      objectStore.put(item, item.id);

      transaction.oncomplete = () => resolve();
      transaction.onerror = e => { console.log(e); reject() };
    })
  }

  const deleteData = (database, id) => {
    return new Promise((resolve, reject) => {
      let transaction = dataBases[database].transaction([database], 'readwrite');
      let objectStore = transaction.objectStore(database);
      objectStore.delete(id);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject();
    })
  }

  const openUsers = () => {
    let request = window.indexedDB.open('users', 1);
    request.onerror = () => {
      console.log("Users database failed to open");
    }

    request.onsuccess = () => {
      console.log("Users Database opened succesfully");
      setDataBases(db => ({ ...db, users: request.result }));
      setUsers(db => ({ ...db, ready: true }));
    }
    request.onupgradeneeded = e => {
      let db = e.target.result;
      let objectStore = db.createObjectStore('users', { keypath: "id" });
      objectStore.createIndex('rating', "rating", { unique: false });
      objectStore.createIndex('team', "team", { unique: false });
    }
  }

  const openPosts = () => {
    let request = window.indexedDB.open('posts', 1);
    request.onerror = () => {
      console.error("Post failed to open.")
    }
    request.onsuccess = () => {
      console.log("Posts opened succesfully");
      setDataBases(db => ({ ...db, posts: request.result }));
      setPosts(db => ({ ...db, ready: true }));
    }
    request.onupgradeneeded = e => {
      console.log("upgrade")
      let db = e.target.result;
      let objectStore = db.createObjectStore('posts', { keypath: "id" });
      objectStore.createIndex('createdAt', 'createdAt', { unique: false });
      objectStore.createIndex('type', 'type', { unique: false });
    }
  }

  useEffect(() => {
    openUsers();
    openPosts();
  }, []);

  useEffect(() => {
    const handleDeletions = async () => {

      let lastDeletionsFetchSeconds = window.localStorage.getItem(`lastDeletionsFetch`) || 0;
      if (lastDeletionsFetchSeconds > Date.now()) lastDeletionsFetchSeconds = 0;

      let lastFetch = new Date();
      lastFetch.setTime(lastDeletionsFetchSeconds);
      const deletionsRef = firestore
        .collection("deletions")
        .where("timestamp", ">", lastFetch)
      const snap = await deletionsRef.get();
      console.log(`Read ${snap.docs.length} documents at IDB deletions`);
      snap.docs.forEach(doc => {
        const data = doc.data();
        lastDeletionsFetchSeconds = Math.max(lastDeletionsFetchSeconds, data.timestamp.seconds * 1000);
        if (data.collection === 'test-posts') {
          deleteData('posts', data.id);
        }
      })
      window.localStorage.setItem(`lastDeletionsFetch`, Number(lastDeletionsFetchSeconds) + 500);

    }
    if (users.ready && posts.ready) handleDeletions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, posts])

  return (
    <IDBContext.Provider
      value={{ deleteData, addData, logAllData, dataForEach, dataForEachConditional, users, posts }}
    >
      {children}
    </IDBContext.Provider>
  );
};
export default IDBProvider;
