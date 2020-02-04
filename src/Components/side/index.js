import React, { useContext } from "react";

import { UserContext } from "../../Providers/userProvider";

import UserSide from "../user_side";
import TopRatedSide from "../top_rated_side";
import SmallCalendar from "../small-calendar";

import "./style.css";
const Side = ({ className }) => {
  const user = useContext(UserContext);
  return (
    <div className={`cac_side ${className}`}>
      {!user.isLoading && user.logged ? <UserSide user={user} /> : null}
      <TopRatedSide />
      <SmallCalendar />
    </div>
  );
};

export default Side;
