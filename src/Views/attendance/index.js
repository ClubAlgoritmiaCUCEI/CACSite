import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { AttendanceContext } from "../../Providers/attendanceProvider";

import { FormButton } from "../../Components/button";
import UserBox from "../../Components/user-box";

import "./style.css";

const CLASS = {
  title: "Introduccion a la programación competitiva",
  date: "11/2/2020",
  isAvailable: true,
  speakers: [
    {
      hasAccount: true,
      uid: "uid de erick",
      displayName: "erickborquez",
      rank: "expert",
      ranking: 1528
    },
    {
      hasAccount: true,
      uid: "uid de erick",
      displayName: "erickborquez",
      rank: "expert",
      ranking: 1528
    }
  ],
  description:
    "Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva. Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva. Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva.",
  attendances: [
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    },
    {
      hasAccount: true,
      uid: "uid de otro wey",
      displayName: "Isaac",
      rank: "pupil"
    }
  ]
};

const Attendance = props => {
  console.log(props);
  let classData = CLASS;

  return (
    <div className="cac_attendance cac_attendance--in-class">
      <div className="cac_attendance_class">
        <h3 className="cac_attendance_title">{classData.title}</h3>
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
        <span className="cac_attendance_date">{classData.date}</span>
        <div className="cac_attendance_description-container">
          <span className="cac_attendance_description-title">Description</span>
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
    </div>
  );
};

export default Attendance;
