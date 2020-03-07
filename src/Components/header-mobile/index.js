import React from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";

import "./style.css";

const HeaderMobile = ({ selection, pageWrapId, outerContainerId }) => {
  return (
    <div className="cac_header_mobile">
      <Menu
        disableAutoFocus
        className="cac_header_mobile_menu"
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
      >
        <div
          className={`cac_header_mobile_item-container ${
            selection === "home" ? "active" : ""
          }`}
        >
          <Link to="/home" className="cac_header_mobile_item">
            Home
          </Link>
        </div>
        <div
          className={`cac_header_mobile_item-container ${
            selection === "public" ? "active" : ""
          }`}
        >
          <Link to="/public" className="cac_header_mobile_item">
            Public
          </Link>
        </div>
        <div
          className={`cac_header_mobile_item-container ${
            selection === "editorial" ? "active" : ""
          }`}
        >
          <Link to="/editorial" className="cac_header_mobile_item">
            Editorial
          </Link>
        </div>
        <div
          className={`cac_header_mobile_item-container ${
            selection === "weekly-problem" ? "active" : ""
          }`}
        >
          <Link to="/weekly-problems" className="cac_header_mobile_item">
            Weekly Problem
          </Link>
        </div>
        <div
          className={`cac_header_mobile_item-container ${
            selection === "calendar" ? "active" : ""
          }`}
        >
          <Link to="/calendar" className="cac_header_mobile_item">
            Calendar
          </Link>
        </div>
        <div
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

/*
<Link
          to="/public"
          id="public"
          className={`cac_header_mobile_item ${
            selection === "public" ? "active" : ""
          }`}
        >
          Public
        </Link>{" "}
        <Link
          to="/editorial"
          id="editorial"
          className={`cac_header_mobile_item ${
            selection === "editorial" ? "active" : ""
          }`}
        >
          Editorial
        </Link>{" "}
        <Link
          to="/weekly-problems"
          id="weekly-problems"
          className={`cac_header_mobile_item ${
            selection === "weekly-problem" ? "active" : ""
          }`}
        >
          Weekly Problem
        </Link>
        <Link
          to="/calendar"
          id="calendar"
          className={`cac_header_mobile_item ${
            selection === "calendar" ? "active" : ""
          }`}
        >
          Calendar
        </Link>
        <Link
          to="/attendance"
          id="attendance"
          className={`cac_header_mobile_item ${
            selection === "attendance" ? "active" : ""
          }`}
        >
          Attendance
        </Link>
        <Link
          to="/create"
          id="create"
          className={`cac_header_mobile_item cac_header_mobile_item--admin ${
            selection === "create" ? "active" : ""
          }`}
        >
          Create
        </Link>
        */
