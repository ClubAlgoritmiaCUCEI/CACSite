import React from "react";
import ColoredName from "../colored-name";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

import DefaultImage from "../../assets/default-photo.jpg";

import "./style.css";

const UserBox = ({ user, className, onClick, redirect = true }) => {
  const history = useHistory();
  return (
    <div
      className={`cac_user-box ${className || ""} ${
        !redirect ? "cac_user-box--redirect" : ""
      }`}
      onClick={onClick}
    >
      <img
        onClick={() => redirect && history.push(`/profile/${user.id}`)}
        className="cac_user-box_photo"
        src={user.photoURL || DefaultImage}
        alt={user.displayName}
      />
      <div className="cac_user-box_text">
        {redirect ? (
          <Link to={`/profile/${user.id}`} className="cac_user-box_name--link">
            <ColoredName rank={user.rank} className="cac_user-box_name">
              {user.displayName}
            </ColoredName>
          </Link>
        ) : (
          <ColoredName rank={user.rank} className="cac_user-box_name">
            {user.displayName}
          </ColoredName>
        )}

        <ColoredName rank={user.rank} className="cac_user-box_ranking">
          {user.rating || ""}
        </ColoredName>
      </div>
    </div>
  );
};

export default UserBox;
