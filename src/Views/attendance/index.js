import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { firebase, firestore } from "../../firebase";

import { AttendanceContext } from "../../Providers/attendanceProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import UserBox from "../../Components/user-box";
import Button from "../../Components/button";
import Popup from "../../Components/popup";
import SelectUsers from "../../Components/select-users";

import "./style.css";

const Attendance = props => {
  const atnContext = useContext(AttendanceContext);
  const user = useContext(UserContext);
  const { usersMap } = useContext(AllUsersContext);
  const [redirect, setRedirect] = useState(false);
  const [inList, setInList] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { preview } = props;

  const classData = preview ? props.classData : atnContext.classData;
  const { code } = props.match.params || classData;

  useEffect(() => {
    const pushData = async () => {
      const classRef = firestore.doc(`class/${code}`);
      if (
        classData.attendances.find(attendance => attendance.id === user.uid) ===
        undefined
      ) {
        await classRef.update({
          attendances: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName
          })
        });
      }
      setInList(true);
    };
    if (
      !preview &&
      !inList &&
      classData.isDataAvailable &&
      !user.isLoading &&
      user.logged
    ) {
      pushData();
    }
  }, [inList, user, classData, code, preview]);

  useEffect(() => {
    let destroyerFunction = () => null;
    if (!preview) {
      if (code !== classData.code) {
        atnContext.setClassData(c => ({ ...c, code }));
      } else {
        if (!classData.validCode) {
          setRedirect(true);
        }
      }
    }
    return destroyerFunction;
  }, [code, user, classData, atnContext, preview]);

  const handleConfirm = async users => {
    setPopupOpen(false);
    const classRef = firestore.doc(`class/${code}`);
    await classRef.update({
      attendances: firebase.firestore.FieldValue.arrayUnion(
        ...users.map(user => ({ id: user.id, displayName: user.displayName }))
      )
    });
    console.log("???");
  };

  return (
    <div className="cac_attendance cac_attendance--in-class">
      {redirect && <Redirect to="/attendance" />}
      {popupOpen && (
        <Popup>
          <SelectUsers
            close={() => setPopupOpen(false)}
            handleConfirm={handleConfirm}
          />
        </Popup>
      )}
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
                user={usersMap[speaker.id] || speaker}
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
            {classData.attendances.map((attendant, i) => (
              <UserBox
                key={i}
                className="cac_attendance_attendant"
                user={usersMap[attendant.id] || attendant}
              />
            ))}
          </div>
        </div>
      )}
      <Button className="cac_attendance_add" onClick={() => setPopupOpen(true)}>
        Add people
      </Button>
    </div>
  );
};

export default Attendance;
