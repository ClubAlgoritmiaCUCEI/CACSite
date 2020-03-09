import React from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

import ColoredName from "../colored-name";

import "./style.css";

const UserSide = ({ user }) => {
  const history = useHistory();
  return (
    <div className="cac_user-side">
      <img
        src={user.photoURL}
        onClick={() => history.push("/profile")}
        alt="profile-pic"
        className="cac_user-side_photo"
      />
      <div className="cac_user-side_info">
        <Link to="/profile" className="cac_user-side_name--link">
          <ColoredName className="cac_user-side_name" rank={user.rank || " "}>
            {user.displayName}
          </ColoredName>
        </Link>
        <p className="cac_user-side_mail">{user.email}</p>
      </div>
    </div>
  );
};

export default UserSide;
