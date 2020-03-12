import React, { useState, useEffect } from "react";

import SearchUsers from "../searchUsers";
import UserBox from "../user-box";
import Button from "../button";
import "./style.css";

const SelectUsers = ({ close, handleConfirm }) => {
  const [users, setUsers] = useState([]);

  const handleUserClick = user => {
    if (users.findIndex(u => u.id === user.id) === -1)
      setUsers([...users, user]);
  };

  const removeUser = user => {
    setUsers(users.filter(u => u.id !== user.id));
  };

  const handleConfirmClick = () => {
    if (users.length > 0) {
      handleConfirm(users);
      close();
    }
  };
  useEffect(() => {
    const handleEvent = e => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEvent);
    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, [close]);

  return (
    <div className="cac_select-users">
      <SearchUsers handleUserClick={handleUserClick} />
      <span className="cac_select-users_title">Selected</span>
      <div className="cac_select-users_users">
        {users.map(user => (
          <UserBox
            redirect={false}
            key={user.id}
            user={user}
            onClick={() => removeUser(user)}
          />
        ))}
      </div>
      <div className="cac_select-users_button-container">
        <Button
          onClick={close}
          className="cac_select-users_button cac_select-users_button--cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmClick}
          className={`cac_select-users_button cac_select-users_button ${
            users.length > 0
              ? ""
              : "cac_select-users_button-container--disabled"
          }`}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default SelectUsers;
