import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { firestore } from "../../firebase";

import { AttendanceContext } from "../../Providers/attendanceProvider";

import UserBox from "../../Components/user-box";

import "./style.css";

const Attendance = props => {
  const atnContext = useContext(AttendanceContext);
  const [redirect, setRedirect] = useState(false);
  const { preview } = props;
  console.log(props);

  useEffect(() => {
    if (!preview) {
      const { code } = props.match.params;
      if (
        !atnContext.classData.isDataAvailable ||
        code !== atnContext.classData.code
      ) {
        const fetchClass = async () => {
          const classRef = firestore.doc(`class/${code}`);
          const snapshot = await classRef.get();
          if (snapshot.exists) {
            atnContext.setClassData(c => ({
              ...c,
              isDataAvailable: true,
              validCode: true,
              code: code,
              ...snapshot.data()
            }));
          } else {
            atnContext.setClassData(c => ({
              ...c,
              isDataAvailable: false,
              code: code,
              validCode: false
            }));
            setRedirect("true");
          }
        };
        fetchClass();
      }
    }
  }, [props.match.params, atnContext, preview]);

  const classData = preview ? props.classData : atnContext.classData;

  return (
    <div className="cac_attendance cac_attendance--in-class">
      {redirect && <Redirect to="/attendance" />}
      {(classData.isDataAvailable || preview) && (
        <div className="cac_attendance_class">
          <h3 className="cac_attendance_title">{classData.title}</h3>
          <span className="cac_attendance_date">{classData.date}</span>
          <div className="cac_attendance_code-container">
            <span className="cac_attendance_code-title">Code</span>
            <span className="cac_attendance_code-code">{classData.code}</span>
          </div>
          <div className="cac_attendance_speakers-container">
            <span className="cac_attendance_speakers-title">Speakers</span>
            {classData.speakers.map((speaker, i) => (
              <UserBox
                key={i}
                className="cac_attendance_speaker_user-box"
                user={speaker}
              />
            ))}
          </div>
          <div className="cac_attendance_description-container">
            <p className="cac_attendance_description-title">Description</p>
            <p className="cac_attendance_description-text">
              {classData.description}
            </p>
          </div>
          <div className="cac_attendance_attendant-container">
            {classData.attendances.map((at, i) => (
              <UserBox key={i} className="cac_attendance_attendant" user={at} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
