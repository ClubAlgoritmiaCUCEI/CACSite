import React, { createContext, useState } from "react";

export const AttendanceContext = createContext({});

const AttendanceProvider = ({ children }) => {
  const [classData, setclassData] = useState({cid:1233});
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  return (
    <AttendanceContext.Provider
      value={{
        isDataAvailable: isDataAvailable,
        setIsDataAvailable: bool => setIsDataAvailable(bool), 
        classData: classData,
        setClassData: data => setclassData(data)
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
export default AttendanceProvider;
