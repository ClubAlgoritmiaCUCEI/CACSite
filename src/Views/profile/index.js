import React, { useContext, useEffect, useState } from "react";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import DefaultImage from "../../assets/default-photo.jpg";

import ColoredName from "../../Components/colored-name";
import Button from "../../Components/button";

import { ReactComponent as Confirmed } from "../../assets/confirm.svg";
import { ReactComponent as Unconfirmed } from "../../assets/cancel.svg";
import "./style.css";

const Profile = ({ match, self = false, onClick = () => null }) => {
  const { id } = match.params;
  const allUsers = useContext(AllUsersContext);

  const [user, setUser] = useState({});
  const [ready, setReady] = useState(false);

  const [exists, setExists] = useState(true);

  console.log(allUsers.usersMap);
  useEffect(() => {
    if (Object.keys(allUsers.usersMap).length > 0) {
      if (allUsers.usersMap[id]) {
        console.log("??");
        setUser(allUsers.usersMap[id]);
      } else {
        setExists(false);
      }
      setReady(true);
    }
  }, [allUsers, id]);

  return (
    <div className="cac_profile">
      <div className="cac_profile_photo-container">
        <img
          src={user.photoURL || DefaultImage}
          alt={user.displayName}
          className="cac_profile_photo"
        />
      </div>
      <div className="cac_profile_information">
        <ColoredName rank={user.rank} className="cac_profile_name">
          {user.displayName}
        </ColoredName>
        <ColoredName rank={user.rank} className="cac_profile_rank">
          {user.rank}, {user.rating}
        </ColoredName>
        <span className="cac_profile_label">
          CodeForces:
          <a
            className="cac_profile_link"
            href={`https://codeforces.com/profile/${user.codeForcesUsername}`}
          >
            {user.codeForcesUsername}
            {user.cfConfirmed ? (
              <Confirmed className="cac_profile_confirmation cac_profile_confirmation--true" />
            ) : (
              <Unconfirmed className="cac_profile_confirmation cac_profile_confirmation--false" />
            )}
          </a>
        </span>
        <span className="cac_profile_label">
          Vjudge:
          <a
            className="cac_profile_link"
            href={`https://vjudge.net/user/${user.codeForcesUsername}`}
          >
            {user.vjudgeUsername}
          </a>
        </span>
        <span className="cac_profile_label">Email: {user.email}</span>
        <span className="cac_profile_label">Description:</span>
        <p className="cac_profile_description">
          {user.description || "Does not have a description yet"}
        </p>
      </div>
      {self && (
        <div className="cac_profile_buttons">
          <Button className="cac_profile_edit" onClick={onClick}>
            Edit profile
          </Button>
        </div>
      )}
    </div>
  );
};
export default Profile;
