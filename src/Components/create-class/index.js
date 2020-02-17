import React, { useState } from "react";

import Button from "../button";
import SearchUsers from "../searchUsers";
import SelectUsers from "../select-users";
import UserBox from "../user-box";
import Popup from "../popup";

import "./style.css";
import "../../Views/create/style.css";

const CreateClass = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [speakers, setSpeakers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
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
          <Button className="cac_create_button cac_create_class_button">
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
  );
};

export default CreateClass;
