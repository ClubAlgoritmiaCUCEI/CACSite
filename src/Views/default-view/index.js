import React from "react";

import Header from "../../Components/header";
import Navigation from "../../Components/navigation";
import Side from "../../Components/side";
import Footer from "../../Components/footer";

import './style.css'

const DefaultView = ({ selection, children }) => {
  return (
    <div className="cac_view">
      <Header />
      <Navigation selection={selection}/>
      <Side />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultView;
