import React, { createContext, useState, useEffect } from "react";

export const IDBContext = createContext({});

const IDBProvider = ({ children }) => {
  const [dataBases, setDataBases] = useState({ users: {} });
  const [users, setUsers] = useState({ ready: false });
  const [posts, setPosts] = useState({ ready: false });

  const logAllData = (database) => {
    let objectStore = dataBases[database].transaction(database).objectStore(database);
    objectStore.openCursor().onsuccess = e => {
      let cursor = e.target.result;
      if (cursor) {
        console.log(cursor.value);
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
  }, [])

  return (
    <IDBContext.Provider
      value={{ deleteData, addData, logAllData, dataForEach, dataForEachConditional, users, posts }}
    >
      {children}
    </IDBContext.Provider>
  );
};
export default IDBProvider;
