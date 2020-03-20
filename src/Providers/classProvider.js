import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const ClassContext = createContext({});

const ClassProvider = ({ children }) => {
  const [previousClasses, setPreviousClasses] = useState([]);
  const [nextClasses, setNextClasses] = useState([]);

  const [status, setStatus] = useState({
    previousClasses: false,
    nextClasses: false
  });

  const fetchPreviousClasses = async () => {
    if (!status.previousClasses) {
      setStatus(c => ({ ...c, previousClasses: true }));
      const postsRef = firestore
        .collection("class")
        .where("active", "==", false)
        .orderBy("date", "desc")
        .limit(20);
      const snapshot = await postsRef.get();
      console.log(`Read ${snapshot.size} documents`);
      const data = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });
      setPreviousClasses(data);
    }
  };

  const fetchNextClasses = async () => {
    if (!status.nextClasses) {
      setStatus(c => ({ ...c, nextClasses: true }));
      const postsRef = firestore
        .collection("class")
        .where("active", "==", true)
        .orderBy("date", "asc")
        .limit(10);
      const snapshot = await postsRef.get();
      console.log(`Read ${snapshot.size} documents`);
      const data = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });
      setNextClasses(data);
    }
  };

  useEffect(() => { });
  return (
    <ClassContext.Provider
      value={{
        previousClasses: previousClasses,
        nextClasses: nextClasses,
        fetchPreviousClasses,
        fetchNextClasses
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
export default ClassProvider;
