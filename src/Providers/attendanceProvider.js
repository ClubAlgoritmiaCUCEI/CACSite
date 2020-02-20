import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const AttendanceContext = createContext({});

const AttendanceProvider = ({ children }) => {
  const [classData, setClassData] = useState({
    isDataAvailable: false,
    fetching: false,
    validCode: true,
    code: ""
  });
  const [lastCode, setCode] = useState("");

  useEffect(() => {
    let destroyerFunction = () => null;
    const { code } = classData;
    if (classData.code !== lastCode) {
      setCode(code);
      setClassData(c => ({ ...c, fetching: true }));
      const fetchClass = async () => {
        const classRef = firestore.doc(`class/${code}`);
        const snapshot = await classRef.get();
        if (snapshot.exists) {
          setClassData(c => ({
            ...c,
            isDataAvailable: true,
            validCode: true,
            code: code,
            fetching: false,
            ...snapshot.data()
          }));
          destroyerFunction = classRef.onSnapshot(async snapshot => {
            setClassData(c => ({
              ...c,
              ...snapshot.data()
            }));
          });
        } else {
          setClassData(c => ({
            ...c,
            isDataAvailable: false,
            code: code,
            fetching: false,
            validCode: false
          }));
        }
      };
      fetchClass();
    }
    return destroyerFunction;
  }, [classData, lastCode]);

  return (
    <AttendanceContext.Provider
      value={{
        classData: classData,
        setClassData: data => setClassData(data)
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
export default AttendanceProvider;
