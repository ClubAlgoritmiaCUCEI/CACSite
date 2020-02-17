import React from "react";
import ColoredName from "../colored-name";

import DefaultImage from "../../assets/default-photo.jpg";

import "./style.css";

const UserBox = ({ user, className, onClick }) => {
  return (
    <div className={`cac_user-box ${className || ""}`} onClick={onClick}>
      <img
        className="cac_user-box_photo"
        src={user.photoURL || DefaultImage}
        alt={user.displayName}
      />
      <div className="cac_user-box_text">
        <ColoredName rank={user.rank} className="cac_user-box_name">
          {user.displayName}
        </ColoredName>
        <span className="cac_user-box_ranking"> {user.rating || ""}</span>
      </div>
    </div>
  );
};

export default UserBox;
