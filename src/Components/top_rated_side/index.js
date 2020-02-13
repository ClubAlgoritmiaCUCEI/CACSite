import React, { useEffect, useState } from "react";

import ColoredName from "../colored-name";

import "./style.css";

const TopRatedSide = ({ allUsers }) => {
  const [ratedList, setRatedList] = useState([]);

  useEffect(() => {
    if (!allUsers.isCFLoading) {
      setRatedList(
        allUsers.usersWithCFAccount.sort((a, b) => b.rating - a.rating)
      );
    }
  }, [allUsers]);
  return (
    <div className="cac_top-rated_side">
      <span className="cac_top-rated_side_title">Top Rated</span>
      {ratedList.map((user, i) => (
        <div key={i} className="cac_top-rated_side_user">
          <span className="cac_top-rated_side_ranking">{i + 1}</span>
          <ColoredName rank={user.rank} className="cac_top-rated_side_name">
            {user.displayName}
          </ColoredName>
          <span className="cac_top-rated_side_ranting">{user.rating}</span>
        </div>
      ))}
    </div>
  );
};

export default TopRatedSide;
