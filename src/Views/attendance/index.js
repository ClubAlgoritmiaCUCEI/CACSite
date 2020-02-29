import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { firebase, firestore } from "../../firebase";

import { AttendanceContext } from "../../Providers/attendanceProvider";
import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import UserBox from "../../Components/user-box";
import Button from "../../Components/button";
import Popup, { TopPopup } from "../../Components/popup";
import SelectUsers from "../../Components/select-users";

import "./style.css";

const Attendance = props => {
  const atnContext = useContext(AttendanceContext);
  const user = useContext(UserContext);
  const { usersMap } = useContext(AllUsersContext);
  const [redirect, setRedirect] = useState(false);
  const [inList, setInList] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    description: "",
    type: ""
  });
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
      user.logged &&
      !user.isLoading &&
      classData.isDataAvailable &&
      !inList &&
      classData.active
    ) {
      pushData();
    }
  }, [inList, user, classData, code, preview]);

  useEffect(() => {
    if (!preview) {
      if (code !== classData.code) {
        atnContext.setClassData(c => ({ ...c, code }));
      } else {
        if (!classData.validCode) {
          setRedirect(true);
        }
      }
    }
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

  const handleAdd = () => {
    if (!preview) {
      setPopupOpen(true);
    }
  };

  const endClass = async () => {
    if (!preview && classData.active) {
      const classRef = firestore.doc(`class/${code}`);
      await classRef.update({
        active: false
      });
    }
  };

  useEffect(() => {
    if (classData.isDataAvailable && !classData.active) {
      setAlert({ open: true, type: "error", description: "Class ended" });
    }
  }, [classData.isDataAvailable, classData.active]);

  return (
    <div className="cac_attendance cac_attendance--in-class">
      {alert.open && (
        <TopPopup
          onClick={() => setAlert({ open: false })}
          className={alert.type}
        >
          {alert.description}
        </TopPopup>
      )}
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
          <span className="cac_attendance_date">
            {preview ? classData.date : classData.date.toDate().toDateString()}
          </span>
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
      <div className="cac_attendance_buttons">
        <Button
          className="cac_attendance_button cac_attendance_end"
          onClick={endClass}
        >
          End class
        </Button>
        <Button
          className="cac_attendance_button cac_attendance_add"
          onClick={handleAdd}
        >
          Add people
        </Button>
      </div>
    </div>
  );
};

export default Attendance;
