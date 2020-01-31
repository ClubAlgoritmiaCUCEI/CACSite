import React from "react";

import "./style.css";

const UserSide = ({ user }) => {
  console.log(user);
  return (
    <div className="cac_user-side">
      <img
        src={user.photoURL}
        alt="profile-pic"
        className="cac_user-side_photo"
      />
      <div className="cac_user-side_info">
        <p className="cac_user-side_name">
          {user.displayName}
          <br />{" "}
        </p>
        <p className="cac_user-side_mail">{user.email}</p>
      </div>
    </div>
  );
};

export default UserSide;
