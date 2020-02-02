import React, { useContext } from "react";

import { UserContext } from "../../Providers/userProvider";

import "./style.css";
import UserSide from "../user_side";

const Side = ({ className }) => {
  const user = useContext(UserContext);

  return (
    <div className={`cac_side ${className}`}>
      {!user.isLoading && user.logged ? <UserSide user={user} /> : null}
    </div>
  );
};

export default Side;
