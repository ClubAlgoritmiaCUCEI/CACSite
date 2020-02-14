import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { FormButton } from "../../Components/button";

import { AttendanceContext } from "../../Providers/attendanceProvider";

import "./style.css";

const AttendanceCode = () => {
  const atnContext = useContext(AttendanceContext);
  const [code, setCode] = useState(atnContext.classData.cid);
  console.log(atnContext);

  const handleTextChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    atnContext.setIsDataAvailable(true);
    atnContext.setClassData(c => ({ ...c, cid: code }));

  };
  return (
    <div className="cac_attendance cac_attendance--not-in-class">
      {atnContext.isDataAvailable && <Redirect to={`attendance/${code}`} />}
      <form className="cac_attendance_form" onSubmit={handleSubmit}>
        <label htmlFor="code" className="cac_attendance_label">
          Enter Code
        </label>
        <input
          type="text"
          name="code"
          id="code"
          className="cac_attendance_text-area"
          value={code}
          onChange={handleTextChange}
        />
        <FormButton className="cac_attendance_form_button ">
          Continue
        </FormButton>
      </form>
    </div>
  );
};

export default AttendanceCode;
