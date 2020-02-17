import React, { useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import Button, { FormButton } from "../../Components/button";

import { AttendanceContext } from "../../Providers/attendanceProvider";

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
    atnContext.setClassData(c => ({ ...c, cid: code, data: CLASS }));
  };
  return (
    <div className="cac_attendance cac_attendance--not-in-class">
      {atnContext.isDataAvailable && <Redirect to={`/attendance/${code}`} />}
      <form className="cac_attendance_form" onSubmit={handleSubmit}>
        <label htmlFor="code" className="cac_attendance_label">
          Enter Code
        </label>
        <input
          type="text"
          name="code"
          id="code"
          className="cac_attendance_text-area"
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
