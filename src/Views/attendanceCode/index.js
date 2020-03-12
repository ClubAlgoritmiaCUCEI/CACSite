import React, { useState, useContext, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { FormButton } from "../../Components/button";
import { TopPopup } from "../../Components/popup";

import { AttendanceContext } from "../../Providers/attendanceProvider";
import { ClassContext } from "../../Providers/classProvider";
import { UserContext } from "../../Providers/userProvider";

import "./style.css";

const AttendanceCode = () => {
  const user = useContext(UserContext);
  const atnContext = useContext(AttendanceContext);
  const [code, setCode] = useState(atnContext.classData.code);
  const [showPopup, setShowPopup] = useState(false);
  const [isPopoupClosing, setIsPopupClosing] = useState(false);
  const [popupClassname, setPopupClassname] = useState("");

  const classes = useContext(ClassContext);

  classes.fetchPreviousClasses();
  classes.fetchNextClasses();

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
    if (
      !atnContext.classData.validCode &&
      code &&
      !atnContext.classData.fetching
    ) {
      setShowPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atnContext.classData.validCode, atnContext.classData.fetching]);

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
        <TopPopup className={`${popupClassname} error`} onClick={closePopup}>
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
      </form>
      {user.isAdmin && (
        <div className="cac_attendance_classes cac_attendance_classes--previous">
          <span className="cac_attendance_classes_title">Next classes</span>
          {classes.nextClasses.map((c, i) => (
            <div key={i} className="cac_attendance_class-box">
              <span className="cac_attendance_class_title">{c.title}</span>
              <span className="cac_attendance_class_date">
                {c.date.toDate().toDateString()}
              </span>
              <span className="cac_attendance_classes_code">{c.code}</span>
              <p className="cac_attendance_classes_description">
                {c.description}
              </p>
              <span className="cac_attendance_classes_counter">
                {c.attendances.length} attendants
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="cac_attendance_classes cac_attendance_classes--previous">
        <span className="cac_attendance_classes_title">Previous classes</span>
        {classes.previousClasses.map((c, i) => (
          <div key={i} className="cac_attendance_class-box">
            <span className="cac_attendance_class_title">{c.title}</span>
            <span className="cac_attendance_class_date">
              {c.date.toDate().toDateString()}
            </span>
            <span className="cac_attendance_classes_code">{c.code}</span>
            <p className="cac_attendance_classes_description">
              {c.description}
            </p>
            <span className="cac_attendance_classes_counter">
              {c.attendances.length} attendants
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCode;
