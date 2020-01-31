import React from "react";
import Side from "../../Components/side";
import Navigation from "../../Components/navigation";

import "./style.css";

const Home = () => {
  return (
    <>
      <Navigation selection="home" />
      <div className="cac_home">
        <Side className="cac_home_side" />
      </div>
    </>
  );
};

export default Home;
