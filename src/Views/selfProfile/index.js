import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { firestore } from "../../firebase";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Profile from "../profile";
import ColoredName from "../../Components/colored-name";
import Button from "../../Components/button";
import { TopPopup } from "../../Components/popup";

import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Confirmed } from "../../assets/confirm.svg";
import { ReactComponent as Unconfirmed } from "../../assets/cancel.svg";

import "./style.css";
import "../profile/style.css";

const SelfProfile = () => {
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [cfUsername, setCfUsername] = useState("");
  const [vjudgeUsername, setVjUsername] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState({
    displayName: false,
    cfUsername: false,
    vjudgeUsername: false
  });
  const [alert, setAlert] = useState({
    visible: false,
    type: "error",
    content: ""
  });

  useEffect(() => {
    if (!user.isCFLoading) {
      setDisplayName(user.displayName);
      setCfUsername(user.codeForcesUsername);
      setVjUsername(user.vjudgeUsername);
      setDescription(user.description || "");
    }
  }, [user]);

  const handleConfirm = async () => {
    let flag = description !== user.description;
    if (editing.displayName) {
      flag = true;
      if (
        allUsers.users.find(u => u.displayName === displayName) !== undefined
      ) {
        setAlert({
          visible: true,
          type: "error",
          content: "Username is already in use"
        });
        return;
      }
    }
    if (editing.cfUsername) {
      flag = true;
      if (
        !window.confirm(
          "Changing codeforces username will require a confirmation, are you sure?"
        )
      )
        return;
    }
    if (editing.vjudgeUsername) {
      flag = true;
      if (
        allUsers.users.find(u => u.vjudgeUsername === vjudgeUsername) !==
        undefined
      ) {
        setAlert({
          visible: true,
          type: "error",
          content: "Vjudge username is already in use"
        });
        return;
      }
    }
    if (flag) {
      const userRef = firestore.doc(`users/${user.uid}`);
      try {
        await userRef.update({
          displayName,
          codeForcesUsername: cfUsername,
          vjudgeUsername: vjudgeUsername,
          description: description,
          cfConfirmed: user.cfConfirmed && !editing.cfUsername
        });
        setAlert({
          visible: true,
          type: "success",
          content: "User updated succesfuly, reload page"
        });
        setEditing(false);
      } catch (e) {
        console.error(e);
        setAlert({
          visible: true,
          type: "error",
          content: "Something bad happened :(."
        });
      }
    }
  };

  return (
    <>
      {alert.visible && (
        <TopPopup
          className={alert.type}
          onClick={() => setAlert({ visible: false })}
        >
          {alert.content}
        </TopPopup>
      )}
      {!user.isLoading && !user.logged ? (
        <div>404 xd</div>
      ) : !isEditing ? (
        <Profile
          match={{ params: { id: user.uid } }}
          self={true}
          onClick={() => setIsEditing(true)}
        />
      ) : (
        <div className="cac_profile">
          <div className="cac_profile_photo-container">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="cac_profile_photo"
            />
            <span className="cac_profile_photo_edit">Upload new photo</span>
          </div>
          <div className="cac_profile_information">
            {!editing.displayName ? (
              <ColoredName rank={user.rank} className="cac_profile_name">
                {user.displayName}
                <Pencil
                  className="cac_profile_edit-svg"
                  onClick={() => setEditing(e => ({ ...e, displayName: true }))}
                />
              </ColoredName>
            ) : (
              <>
                <span className="cac_profile_label">Display Name:</span>
                <textarea
                  className="cac_profile_text-area"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                />
              </>
            )}
            <ColoredName rank={user.rank} className="cac_profile_rank">
              {user.rank}, {user.rating}
            </ColoredName>
            {!editing.cfUsername ? (
              <span className="cac_profile_label">
                CodeForces:
                <a
                  className="cac_profile_link"
                  href={`https://codeforces.com/profile/${user.codeForcesUsername}`}
                >
                  {user.codeForcesUsername}
                </a>
                <Pencil
                  className="cac_profile_edit-svg"
                  onClick={() => setEditing(e => ({ ...e, cfUsername: true }))}
                />
              </span>
            ) : (
              <>
                <span className="cac_profile_label">CodeForces:</span>
                <textarea
                  className="cac_profile_text-area"
                  value={cfUsername}
                  onChange={e => setCfUsername(e.target.value)}
                />
              </>
            )}
            {!editing.vjudgeUsername ? (
              <span className="cac_profile_label">
                Vjudge:
                <a
                  className="cac_profile_link"
                  href={`https://vjudge.net/user/${user.codeForcesUsername}`}
                >
                  {user.vjudgeUsername}
                </a>
                <Pencil
                  className="cac_profile_edit-svg"
                  onClick={() =>
                    setEditing(e => ({ ...e, vjudgeUsername: true }))
                  }
                />
              </span>
            ) : (
              <>
                <span className="cac_profile_label">Vjudge:</span>
                <textarea
                  className="cac_profile_text-area"
                  value={vjudgeUsername}
                  onChange={e => setVjUsername(e.target.value)}
                />
              </>
            )}
            <span className="cac_profile_label">Email: {user.email}</span>
            <span className="cac_profile_label">Introduction:</span>
            <textarea
              className="cac_profile_description-editing"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="cac_profile_buttons">
            <Button
              className=" cac_profile_edit cac_profile_cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              className="cac_profile_edit"
              onClick={() => handleConfirm()}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default SelfProfile;
