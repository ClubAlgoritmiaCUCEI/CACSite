import React, { useEffect, useState } from "react";
import "./style.css";

const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.ratedList?activeOnly=true";

const TopRatedSide = ({ children }) => {
  const [cfusers, setCfusers] = useState({ data: [] });
  useEffect(() => {
    const fetchData = () =>
      fetch(API + DEFAULT_QUERY)
        .then(res => res.json())
        .then(data => {
          console.log(data.result);
          setCfusers({ data: data.result });
          console.log(cfusers);
          return data.result;
        });
    setCfusers({ data: fetchData() });
    console.log(cfusers);
    // fetchData();
  }, []);
  return (
    <>
      <ul></ul>;
    </>
  );
};

export default TopRatedSide;
