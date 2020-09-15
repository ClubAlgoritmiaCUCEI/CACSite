import React, { useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import { signOut } from "../../firebase";

import { slide as Menu } from "react-burger-menu";

import Button from "../button";
import UserSide from "../user_side";
import TopRatedSide from "../top_rated_side";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";
import { ReactComponent as DefaultPhoto } from "../../assets/default-photo.jpg";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import "./style.css";

const HeaderMobile = ({ selection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);

  const handleSectionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="cac_header_mobile">
      <Menu
        left
        isOpen={isOpen}
        onStateChange={state => setIsOpen(state.isOpen)}
        disableAutoFocus
        className="cac_header_mobile_menu cac_header_mobile_menu--left"
      >
        <span className="cac_header_mobile_bottom">
          Club de Algoritmia CUCEI 2020
        </span>
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

      {!user.isLoading && user.logged && (
        <Menu
          right
          isOpen={isUserOpen}
          onStateChange={state => setIsUserOpen(state.isOpen)}
          disableAutoFocus
          className="cac_header_mobile_menu cac_header_mobile_menu--right"
        >
          <span className="cac_header_mobile_bottom">
            Club de Algoritmia CUCEI 2020
          </span>
          <div className="cac_header_mobile_section">
            <UserSide user={user} onClick={() => setIsUserOpen(false)} />
          </div>
          <div className="cac_header_mobile_section">
            <TopRatedSide
              onClick={() => setIsUserOpen(false)}
              allUsers={allUsers}
              className="cac_header_mobile_top"
            />
          </div>
          <div className="cac_header_mobile_section">
            <Link
              onClick={() => setIsUserOpen(false)}
              to="/"
              className="cac_header_mobile_option"
            >
              Saved
            </Link>
            <Link
              onClick={() => setIsUserOpen(false)}
              to="/"
              className="cac_header_mobile_option"
            >
              Help
            </Link>
            <span
              onClick={() => {
                setIsUserOpen(false);
                signOut();
              }}
              className="cac_header_mobile_option"
            >
              Sign out
            </span>
          </div>
        </Menu>
      )}
      <div className="cac_header_mobile_user">
        {!user.isLoading &&
          (user.logged ? (
            <img
              onClick={() => {
                setIsUserOpen(true);
              }}
              className="cac_header_mobile_user-photo"
              src={user.photoURL || DefaultPhoto}
              alt={user.displayName}
            />
          ) : (
            <Link to="/login">
              <Button className="cac_header_mobile_sign-in">Sign in</Button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HeaderMobile;
