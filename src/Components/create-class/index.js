import React, { useState } from "react";

import { firestore } from "../../firebase";

import Button from "../button";
import SelectUsers from "../select-users";
import UserBox from "../user-box";
import Popup, { TopPopup } from "../popup";
import Attendance from "../../Views/attendance";

import { generateRandomCode } from "../../utilities";

import "./style.css";
import "../../Views/create/style.css";

const DEFAULT_ATTENDANCES = [
  {
    uid: "123123124",
    displayName: "Erick",
    rank: "pupil",
    rating: 1200
  },
  {
    uid: "hkhaksdh12",
    displayName: "Jorge ivan",
    rank: "expert",
    rating: 1520
  },
  {
    uid: "uid de otro wey",
    displayName: "Franco",
    rank: "expert",
    rating: 2624
  },
  {
    uid: "uid de otro wey",
    displayName: "Crystal",
    rank: "expert",
    rating: 2624
  }
];

const CreateClass = ({ preview }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [speakers, setSpeakers] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    description: "",
    type: ""
  });

  const canPost = () => {
    if (!(title && code && description && speakers.length > 0)) {
      return false;
    }
    const dateFormated = new Date(date);
    if (isNaN(dateFormated.getTime())) {
      return false;
    }
    return true;
  };

  const handlePostButton = async () => {
    if (!isSubmiting)
      if (canPost()) {
        setIsSubmiting(true);
        const classData = {
          title,
          date: new Date(date),
          description,
          code,
          active: true,
          speakers: speakers.map(speaker => ({
            id: speaker.id,
            displayName: speaker.displayName
          })),
          attendances: []
        };

        const classRef = firestore.doc(`class/${code}`);
        const snapshot = await classRef.get();
        if (!snapshot.exists) {
          try {
            await classRef.set(classData);
            setAlert({
              open: true,
              description: "Class created successfully",
              type: "success"
            });
            setTitle("");
            setDate("");
            setCode("");
            setSpeakers([]);
            setDescription("");
          } catch (err) {
            console.error("Error creating class", err.mesage);
          }
        } else {
          setAlert({
            open: true,
            description: "Code is already in use",
            type: "error"
          });
        }
        setIsSubmiting(false);
      } else {
        setAlert({
          open: true,
          description: "Verify all information",
          type: "error"
        });
      }
  };

  const closeAlert = () => {
    setAlert({ open: false });
  };

  return (
    <>
      {alert.open && (
        <TopPopup onClick={closeAlert} className={alert.type}>
          {alert.description}
        </TopPopup>
      )}
      {preview ? (
        <Attendance
          preview={true}
          classData={{
            title: title,
            date: date,
            description: description,
            code: code,
            speakers: speakers,
            attendances: DEFAULT_ATTENDANCES
          }}
          match={{ params: null }}
        />
      ) : (
        <div className="cac_create_class">
          {popupOpen && (
            <Popup>
              <SelectUsers
                close={() => setPopupOpen(false)}
                handleConfirm={setSpeakers}
              />
            </Popup>
          )}
          <div className="cac_create_class--left">
            <div className="cac_create_section">
              <label htmlFor="title" className="cac_create_title">
                Title
              </label>
              <input
                name="title"
                id="title"
                type="text"
                className="cac_create_input cac_create_input--title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="cac_create_section">
              <label htmlFor="title" className="cac_create_title">
                Date (mm/dd/yy)
              </label>
              <input
                name="date"
                id="date"
                type="text"
                className="cac_create_input cac_create_input--title"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="cac_create_section">
              <label htmlFor="description" className="cac_create_title">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="cac_create_textarea"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="cac_create_class--right">
            <div className="cac_create_section">
              <label htmlFor="code" className="cac_create_title">
                Code
              </label>
              <input
                name="code"
                id="code"
                type="text"
                className=" cac_create_input cac_create_input--title cac_create_class_code"
                value={code}
                minLength="3"
                maxLength="6"
                required
                onChange={e => setCode(e.target.value)}
              />
              <Button
                className="cac_create_button cac_create_class_button"
                onClick={() => setCode(generateRandomCode(6))}
              >
                Random code
              </Button>
            </div>
            <div className="cac_create_section cac_create_cass_speakers">
              <span className="cac_create_title">Speakers</span>
              {speakers.map((speaker, i) => (
                <UserBox
                  key={speaker.displayName}
                  user={speaker}
                  className="cac_create_speaker"
                />
              ))}
              <Button
                className="cac_create_button cac_create_class_button"
                onClick={() => setPopupOpen(true)}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button className="cac_create_class_post" onClick={handlePostButton}>
        Post
      </Button>
    </>
  );
};

export default CreateClass;
