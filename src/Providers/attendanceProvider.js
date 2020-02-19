import React, { createContext, useState } from "react";

export const AttendanceContext = createContext({});

const AttendanceProvider = ({ children }) => {
  const [classData, setclassData] = useState({
    isDataAvailable: false,
    code: "",
    validCode: true
  });

  return (
    <AttendanceContext.Provider
      value={{
        classData: classData,
        setClassData: data => setclassData(data)
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
export default AttendanceProvider;
