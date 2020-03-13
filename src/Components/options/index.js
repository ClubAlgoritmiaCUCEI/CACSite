import React, { useState, useRef } from "react";

import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";

import "./style.css";

const Options = ({
  className = "",
  handleDelete = () => null,
  user,
  author
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const wrapperOpenerRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false), wrapperOpenerRef);

  const handleOptionsClick = e => {
    e.stopPropagation();
    const handleKeyPress = e => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.removeEventListener("keydown", handleKeyPress);
    } else {
      window.addEventListener("keydown", handleKeyPress);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`cac_options ${className}`}
      onClick={e => {
        e.stopPropagation();
        setIsOpen(true);
      }}
    >
      <Ellipsis className="cac_options_icon" />
      {isOpen && (
        <div
          className="cac_options-container"
          ref={wrapperRef}
          onClick={e => e.stopPropagation()}
        >
          <div className="cac_options_section">
            <span className="cac_options_option">Report</span>
            {(author.id === user.uid || user.isAdmin) && (
              <span
                className="cac_options_option"
                onClick={e => {
                  handleOptionsClick(e);
                  handleDelete();
                }}
              >
                Delete
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
