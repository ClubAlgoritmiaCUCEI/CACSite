import React, { useState, useContext, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import Button, { FormButton } from "../../Components/button";
import { TopPopup } from "../../Components/popup";

import { AttendanceContext } from "../../Providers/attendanceProvider";

import "./style.css";

const AttendanceCode = () => {
  const atnContext = useContext(AttendanceContext);
  const [code, setCode] = useState(atnContext.classData.code);
  const [showPopup, setShowPopup] = useState(false);
  const [isPopoupClosing, setIsPopupClosing] = useState(false);
  const [popupClassname, setPopupClassname] = useState("");

  const handleTextChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!atnContext.fetching) {
      atnContext.setClassData(c => ({ ...c, code: code }));
    }
  };

  useEffect(() => {
    if (!atnContext.validCode && code && !atnContext.fetching) {
      console.log(atnContext);
      setShowPopup(true);
    }
  }, [atnContext.validCode, atnContext.fetching]);

  const closePopup = () => {
    if (!isPopoupClosing) {
      setIsPopupClosing(true);
      setPopupClassname("close");
      setTimeout(() => {
        setShowPopup(false);
        setPopupClassname("");
        setIsPopupClosing(false);
      }, 300);
    }
  };
  return (
    <div className="cac_attendance cac_attendance--not-in-class">
      {atnContext.classData.isDataAvailable && (
        <Redirect to={`/attendance/${code}`} />
      )}
      {showPopup && (
        <TopPopup className={popupClassname} onClick={closePopup}>
          Wrong Code
        </TopPopup>
      )}
      <form className="cac_attendance_form" onSubmit={handleSubmit}>
        <label htmlFor="code" className="cac_attendance_label">
          Enter Code
        </label>
        <input
          type="text"
          name="code"
          id="code"
          className={`cac_attendance_text-area ${
            atnContext.classData.validCode
              ? ""
              : "cac_attendance_text-area--invalid"
          }`}
          required
          value={code}
          onChange={handleTextChange}
        />
        <FormButton className="cac_attendance_form_button ">
          Continue
        </FormButton>
        <Button className="cac_attendance_button ">Create class</Button>
      </form>
    </div>
  );
};

export default AttendanceCode;
