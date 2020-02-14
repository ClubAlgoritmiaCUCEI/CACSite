import React, { createContext, useState } from "react";

export const AttendanceContext = createContext({});

const AttendanceProvider = ({ children }) => {
  const [classData, setclassData] = useState({ cid: "", validCode: true, data: {} });
  const [isDataAvailable, setIsDataAvailable] = useState(false);

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
