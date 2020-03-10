import React, { useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import Button from "../button";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";
import { ReactComponent as DefaultPhoto } from "../../assets/default-photo.jpg";

import { UserContext } from "../../Providers/userProvider";

import "./style.css";

const HeaderMobile = ({ selection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const handleSectionClick = () => {
    console.log("jeje");
    setIsOpen(false);
  };
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div className="cac_header_mobile">
      <Menu
        left
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
      <Logo className="cac_header_mobile_logo" />
      <div className="cac_header_mobile_user">
        {!user.isLoading &&
          (user.logged ? (
            <img
              className="cac_header_mobile_user-photo"
              src={user.photoURL || DefaultPhoto}
              alt={user.displayName}
            />
          ) : (
              <Link to="/login">
                <Button
                  onClick={() => null}
                  className="cac_header_mobile_sign-in"
                >
                  Sign in
              </Button>
              </Link>
            ))}
      </div>
      <Menu
        right
        isOpen={isUserOpen}
        onStateChange={state => setIsUserOpen(state.isOpen)}
        disableAutoFocus
        className="cac_header_mobile_menu cac_header_mobile_menu--right"
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

      </Menu>

    </div>
  );
};

export default HeaderMobile;
