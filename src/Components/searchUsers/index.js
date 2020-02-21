import React, { useContext, useState, useEffect } from "react";
import { AllUsersContext } from "../../Providers/userProvider";

import UserBox from "../user-box";

import "./style.css";

const SearchUsers = ({ handleUserClick }) => {
  const allUsers = useContext(AllUsersContext);
  const [displayName, setDisplayName] = useState("");
  const [canFilter, setCanFilter] = useState(true);
  const [match, setMatch] = useState([]);
  const [lastQuery, setLastQuery] = useState();

  useEffect(() => {
    if (!allUsers.isCFLoading && canFilter && lastQuery !== displayName) {
      setCanFilter(false);
      setLastQuery(displayName);
      const query = displayName.toLocaleLowerCase();
      setMatch(
        allUsers.users.filter(user =>
          user.displayName.toLocaleLowerCase().includes(query)
        )
      );
      setTimeout(() => {
        setCanFilter(true);
      }, 250);
    }
  }, [displayName, canFilter, lastQuery, allUsers]);

  return (
    <div className="cac_search-user">
      <input
        type="text"
        className="cac_search-user_input"
        value={displayName}
        placeholder="User name"
        onChange={e => setDisplayName(e.target.value)}
      />
      <div className="cac_search_users-container">
        {match.map((user, i) => (
          <UserBox key={i} user={user} onClick={() => handleUserClick(user)} />
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
