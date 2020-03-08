import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";

import "./style.css";

const HeaderMobile = ({ selection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSectionClick = () => {
    console.log("jeje");
    setIsOpen(false);
  };

  return (
    <div className="cac_header_mobile">
      <Menu
        isOpen={isOpen}
        onStateChange={state => setIsOpen(state.isOpen)}
        disableAutoFocus
        className="cac_header_mobile_menu"
      >
        <div
          onClick={handleSectionClick}
          className={`cac_header_mobile_item-container ${
            selection === "home" ? "active" : ""
          }`}
        >
          <Link to="/home" className="cac_header_mobile_item">
            Home
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cac_header_mobile_item-container ${
            selection === "public" ? "active" : ""
          }`}
        >
          <Link to="/public" className="cac_header_mobile_item">
            Public
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cac_header_mobile_item-container ${
            selection === "editorial" ? "active" : ""
          }`}
        >
          <Link to="/editorial" className="cac_header_mobile_item">
            Editorial
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cac_header_mobile_item-container ${
            selection === "weekly-problem" ? "active" : ""
          }`}
        >
          <Link to="/weekly-problems" className="cac_header_mobile_item">
            Weekly Problem
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cac_header_mobile_item-container ${
            selection === "calendar" ? "active" : ""
          }`}
        >
          <Link to="/calendar" className="cac_header_mobile_item">
            Calendar
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cac_header_mobile_item-container ${
            selection === "attendance" ? "active" : ""
          }`}
        >
          <Link to="/attendance" className="cac_header_mobile_item">
            Attendance
          </Link>
        </div>
      </Menu>
      <Logo className="cac_header_logo" />
    </div>
  );
};

export default HeaderMobile;
