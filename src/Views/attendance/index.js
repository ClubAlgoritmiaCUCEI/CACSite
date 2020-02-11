import React, { useState } from 'react'

import { FormButton } from '../../Components/button'
import UserBox from '../../Components/user-box'

import './style.css'

const CLASS = {
  title: "Introduccion a la programación competitiva",
  date: "11/2/2020",
  isAvailable: true,
  speakers: [
    { hasAccount: true, uid: "uid de erick", displayName: "erickborquez", rank: "expert", ranking: 1528 },
    { hasAccount: true, uid: "uid de erick", displayName: "erickborquez", rank: "expert", ranking: 1528 },
  ],
  description: "Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva. Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva. Aqui vamos a dar una descripcion a la introduccion a la programacion competitiva.",
  attendances: [
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" },
    { hasAccount: true, uid: "uid de otro wey", displayName: "Isaac", rank: "pupil" }
  ]
}

const Attendance = () => {
  const [code, setCode] = useState("");
  const [inClass, setInClass] = useState(false);

  const handleTextChange = e => {
    setCode(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setInClass(true);
  }

  return (
    <>
      {!inClass ? (
        <div className="cac_attendance cac_attendance--not-in-class" >
          <form className="cac_attendance_form" onSubmit={handleSubmit}>
            <label htmlFor="code" className="cac_attendance_label">Enter Code</label>
            <input type="text" name="code" id="code"
              className="cac_attendance_text-area" value={code} onChange={handleTextChange}
            />
            <FormButton className="cac_attendance_form_button ">Continue</FormButton>
          </form>
        </div>
      ) : (
          <div className="cac_attendance cac_attendance--in-class" >
            <div className="cac_attendance_class">
              <h3 className="cac_attendance_title">{CLASS.title}</h3>
              <div className="cac_attendance_speakers-container">
                <span className="cac_attendance_speakers-title">Speakers</span>
                {CLASS.speakers.map(speaker => <UserBox className="cac_attendance_speaker_user-box" user={speaker} />)}
              </div>
              <span className="cac_attendance_date">{CLASS.date}</span>
              <div className="cac_attendance_description-container">
                <span className="cac_attendance_description-title">Description</span>
                <p className="cac_attendance_description-text">{CLASS.description}</p>
              </div>
              <div className="cac_attendance_attendant-container">
                {CLASS.attendances.map(at => <UserBox className="cac_attendance_attendant" user={at} />)}
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default Attendance;