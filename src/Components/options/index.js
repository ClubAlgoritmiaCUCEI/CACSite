import React, { useState, useRef } from "react";


import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";

import "./style.css";

const Options = ({
  className = "",
  containerClassName = "",
  handleDelete = () => null,
  user,
  author,
  children,
  defaultContent = true,
  opener,
  styleChildren = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const wrapperOpenerRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false), wrapperOpenerRef);

  const handleOptionsClick = e => {
    e.stopPropagation();
    const handleKeyPress = e => {
      if (e.key === "Escape") close();
    };
    const close = () => {
      window.removeEventListener("keydown", handleKeyPress);
      setIsOpen(false);

    }
    const open = () => {
      window.addEventListener("keydown", handleKeyPress);
      setIsOpen(true);
    }
    if (isOpen) close();
    else open();
  };

  return (
    <div
      className={`cac_options ${className}`}
      onClick={e => {
        e.stopPropagation();
        handleOptionsClick(e);
      }}
      ref={wrapperOpenerRef}
    >
      {opener || <Ellipsis className="cac_options_icon" />}
      {isOpen && (
        <div
          className={`cac_options-container ${containerClassName}`}
          ref={wrapperRef}
          onClick={e => e.stopPropagation()}
        >
          {defaultContent ? (
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
          ) : (<div className="cac_options_section">
            {styleChildren ? (<>
              {React.Children.map(children || null, child => {
                return React.cloneElement(child, { className: child.props.className + " cac_options_option" })
              })}
            </>) : <> {children}</>}
          </div>)}
        </div>
      )}
    </div>
  );
};

export default Options;
