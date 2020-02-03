import React, { useEffect, useState } from "react";
import "./style.css";

const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.ratedList?activeOnly=true";

const TopRatedSide = ({ children }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(API + DEFAULT_QUERY)
      .then(res => res.json())
      .then(data => setUsers(data.result));
  }, []);
  console.log(users);
  return (
    <>
      <ul></ul>;
    </>
  );
};

export default TopRatedSide;
